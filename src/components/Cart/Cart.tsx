import * as _React from 'react';
import { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    Button,
    Stack,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { getDatabase, ref, onValue, off, remove, update } from 'firebase/database';
import { NavBar } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { ShopProps } from '../../customHooks';
import { shopStyles } from '../Shop';
import { serverCalls } from '../../api';
import { MessageType } from '../Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

export interface CreateOrderProps {
    order: ShopProps[]
}
export const Cart = () => {
    const db = getDatabase();
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>()
    const [messageType, setMessageType] = useState<MessageType>()
    const [currentCart, setCurrentCart] = useState<ShopProps[]>()
    const userId = localStorage.getItem('uuid')
    const cartRef = ref(db, `carts/${userId}/`);
    useEffect(() => {
        onValue(cartRef, (snapshot) => {
            const data = snapshot.val()
            let cartList = []

            if (data) {
                for (let [key, value] of Object.entries(data)) {
                    let cartItem = value as ShopProps
                    cartItem['id'] = key
                    cartList.push(cartItem)
                }
            }
            setCurrentCart(cartList as ShopProps[])
        })
        return () => {
            off(cartRef)
        }
    }, []);
    const updateQuantity = async (id: string, operation: string) => {
        const dataIndex: number = currentCart?.findIndex((cart) => cart.id === id) as number
        console.log(dataIndex)
        if (currentCart) console.log(currentCart[dataIndex as number])
        const updatedCart = [...currentCart as ShopProps[]]
        console.log(updatedCart)
        if (operation == 'dec') {
            updatedCart[dataIndex].quantity -= 1
        } else {
            updatedCart[dataIndex].quantity += 1
        }

        setCurrentCart(updatedCart)
    }
    const updateCart = async (cartItem: ShopProps) => {
        const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)
        update(itemRef, {
            quantity: cartItem.quantity
        })
            .then(() => {
                setMessage('Successfully Updated Your Cart')
                setMessageType('success')
                setOpen(true)
            })
            .then(() => {
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((error) => {
                setMessage(error.message)
                setMessageType('error')
                setOpen(true)
            })
    }
    const deleteItem = async (cartItem: ShopProps) => {
        const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)
        remove(itemRef)
            .then(() => {
                setMessage('Successfully Deleted Item from Cart')
                setMessageType('success')
                setOpen(true)
            })
            .then(() => {
                setTimeout(() => window.location.reload(), 2000)
            })
            .catch((error) => {
                setMessage(error.message)
                setMessageType('error')
                setOpen(true)
            })
    }
    const checkout = async () => {
        const data: CreateOrderProps = {
            'order': currentCart as ShopProps[]
        }
        const response = await serverCalls.createOrder(data)
        if (response.status === 200) {
            remove(cartRef)
                .then(() => {
                    console.log("Cart cleared successfully")
                    setMessage('Your Order Was Successful')
                    setMessageType('success')
                    setOpen(true)
                    setTimeout(() => { window.location.reload() }, 2000)
                })
                .catch((error) => {
                    console.log("Error clearing cart: " + error.message)
                    setMessage(error.message)
                    setMessageType('error')
                    setOpen(true)
                    setTimeout(() => { window.location.reload() }, 2000)
                })
        } else {
            setMessage('Error with your Checkout')
            setMessageType('error')
            setOpen(true)
            setTimeout(() => { window.location.reload() }, 2000)
        }
    }
    return (
        <Box sx={shopStyles.main}>
            <NavBar />
            <Stack direction='column' sx={shopStyles.main}>
                <Stack direction='row' alignItems='center' sx={{ marginTop: '100px', marginLeft: '200px' }}>
                    <Typography
                        variant='h4'
                        sx={{ marginRight: '20px', color: 'white' }}
                    >
                        Your Cart
                    </Typography>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={checkout}
                        sx={{
                            padding: '10px 20px',
                            border: '5px solid black',
                            borderRadius: '60%',
                            boxShadow: '0 0 25px green',
                            '&:hover': {
                                boxShadow: '0 0 15px green',
                            },
                        }}
                    >
                        Checkout <FontAwesomeIcon icon={faCar} />
                    </Button>

                </Stack>
                <Grid container spacing={3} sx={shopStyles.grid}>
                    {currentCart?.map((cart: ShopProps, index: number) => (
                        <Grid item key={index} xs={12} md={6} lg={4}>
                            <Card sx={shopStyles.card}>
                                <CardMedia
                                    component='img'
                                    sx={shopStyles.cardMedia}
                                    image={cart.image}
                                    alt={cart.name}
                                />
                                <CardContent>
                                    <Stack direction='column' justifyContent='space-between' alignItems='center'>
                                        <Accordion sx={{ color: 'white', backgroundColor: theme.palette.secondary.light }}>
                                            <AccordionSummary
                                                expandIcon={<InfoIcon sx={{ color: theme.palette.primary.main }} />}
                                            >
                                                <Typography>{cart.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>{cart.description}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            sx={shopStyles.stack2}
                                        >
                                            <Button
                                                size='large'
                                                variant='text'
                                                onClick={() => { updateQuantity(cart.id, 'dec') }}
                                            >-</Button>
                                            <Typography variant='h6' sx={{ color: 'white' }}>
                                                {cart.quantity}
                                            </Typography>
                                            <Button
                                                size='large'
                                                variant='text'
                                                onClick={() => { updateQuantity(cart.id, 'inc') }}
                                            >+</Button>
                                        </Stack>
                                        <Button
                                            size='medium'
                                            variant='outlined'
                                            sx={shopStyles.button}
                                            onClick={() => { updateCart(cart) }}
                                        >
                                            Update Quantity = ${(cart.quantity * parseFloat(cart.price)).toFixed(2)}
                                        </Button>
                                        <Button
                                            size='medium'
                                            variant='outlined'
                                            sx={shopStyles.button}
                                            onClick={() => { deleteItem(cart) }}
                                        >
                                            Delete Item From Cart
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

// import * as _React from 'react';
// import { useState, useEffect } from 'react';
// import {
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Card,
//     CardMedia,
//     CardContent,
//     Grid,
//     Box,
//     Button,
//     Stack,
//     Typography,
//     Snackbar,
//     Alert
// } from '@mui/material';
// import RamenDiningIcon from '@mui/icons-material/RamenDining';
// import { getDatabase, ref, onValue, off, remove, update } from 'firebase/database';
// import LunchDiningIcon from '@mui/icons-material/LunchDining';

// //internal imports
// import { NavBar } from '../sharedComponents';
// import { theme } from '../../Theme/themes';
// import { ShopProps } from '../../customHooks';
// import { shopStyles } from '../Shop';
// import { serverCalls } from '../../api';
// import { MessageType } from '../Auth';
// import { Order } from '../Order';


// export interface CreateOrderProps {
//     order: ShopProps[]
// }

// export const Cart = () => {
//     //setup our hooks
//     const db = getDatabase();
//     const [open, setOpen] = useState(false);
//     const [message, setMessage] = useState<string>();
//     const [messageType, setMessageType] = useState<MessageType>();
//     const [currentCart, setCurrentCart] = useState<ShopProps[]>(); //whole list of items in our cart
//     const userId = localStorage.getItem('uuid');
//     const cartRef = ref(db, `carts/${userId}/`);


//     // monitor the changes to our cart in the database 
//     useEffect(() => {


//         // onValue listens for changes in our cart
//         onValue(cartRef, (snapshot) => {
//             const data = snapshot.val() //grabing cart data 

//             let cartList = [] //creating an empty list to hold our cart dictionaries

//             if (data) {
//                 for (let [key, value] of Object.entries(data)) { // for key,value in data.items() in Python
//                     let cartItem = value as ShopProps
//                     cartItem['id'] = key
//                     cartList.push(cartItem)
//                 }
//             }

//             setCurrentCart(cartList as ShopProps[])
//         })

//         return () => {
//             off(cartRef) //detaches the onValue listeners almost like refreshing it. 
//         }
//     }, []) //we want this to this once & only once


//     // Full CRUD capabilities for our Cart
//     // Update Quantity
//     const updateQuantity = async (id: string, operation: '-' | '+') => {

//         // findIndex method to find index based on the id
//         const dataIndex: number = currentCart?.findIndex((cart) => cart.id === id) as number


//         // make a new variable for our currentCart
//         const updateCart = [...currentCart as ShopProps[]]
//         operation === '-' ? updateCart[dataIndex].quantity -= 1 : updateCart[dataIndex].quantity += 1

//         setCurrentCart(updateCart)
//     }

//     // Update Cart
//     const updateCart = async (cartItem: ShopProps) => {

//         const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)

//         update(itemRef, {
//             quantity: cartItem.quantity
//         })
//             .then(() => {
//                 setMessage(`Successfully Update your Cart`)
//                 setMessageType('success')
//                 setOpen(true)
//             })
//             .then(() => { setTimeout(() => window.location.reload(), 2000) })
//             .catch((error) => {
//                 setMessage(error.message)
//                 setMessageType('error')
//                 setOpen(true)
//             })
//     }

//     // Delete Item from Cart
//     const deleteItem = async (cartItem: ShopProps) => {
//         const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)

//         remove(itemRef)
//             .then(() => {
//                 setMessage('Successfully deleted item from Cart')
//                 setMessageType('success')
//                 setOpen(true)
//             })
//             .then(() => { setTimeout(() => window.location.reload(), 2000) })
//             .catch((error) => {
//                 setMessage(error.message)
//                 setMessageType('error')
//                 setOpen(true)
//             })
//     }


//     // Checkout & create an order!
//     const checkout = async () => {

//         const data: CreateOrderProps = {
//             'order': currentCart as ShopProps[]
//         }

//         console.log('we in the checkout zone!')

//         const response = await serverCalls.createOrder(data)

//         if (response.status === 200) {
//             remove(cartRef)
//                 .then(() => {
//                     setMessage('Successfully checked out')
//                     setMessageType('success')
//                     setOpen(true)
//                 })
//                 .then(() => setTimeout(() => window.location.reload(), 2000))
//                 .catch((error) => {
//                     setMessage(error.message)
//                     setMessageType('error')
//                     setOpen(true)
//                 })
//         } else {
//             setMessage('Error with Checkout')
//             setMessageType('error')
//             setOpen(true)
//         }
//     }

//     return (
//         <Box sx={shopStyles.main}>
//             <NavBar />
//             <Stack direction='column' sx={shopStyles.main} alignItems='center'>
//                 <Stack
//                     direction='row'
//                     alignItems='center'
//                     justifyContent='start'
//                     sx={{ marginTop: '100px', width: '100%', marginLeft: '400px' }}
//                 >
//                     <Typography variant='h4' sx={{ marginRight: '20px' }}>
//                         Your Cart
//                     </Typography>
//                     <Button
//                         variant='contained'
//                         color='primary'
//                         onClick={checkout}
//                         sx={{ width: '150px' }}
//                     >
//                         Checkout <LunchDiningIcon />
//                     </Button>
//                 </Stack>
//                 <Grid container spacing={3} sx={shopStyles.grid}>
//                     {currentCart?.map((cart: ShopProps, index: number) => (
//                         <Grid item key={index} xs={12} md={6} lg={4}>
//                             <Card sx={shopStyles.card}>
//                                 <CardMedia
//                                     component='img'
//                                     sx={shopStyles.cardMedia}
//                                     image={cart.image}
//                                     alt={cart.name}
//                                 />
//                                 <CardContent>
//                                     <Stack
//                                         direction='column'
//                                         justifyContent='space-between'
//                                         alignItems='center'
//                                     >
//                                         <Accordion sx={{ color: 'white', backgroundColor: theme.palette.secondary.light, width: '270px' }}>
//                                             <AccordionSummary
//                                                 expandIcon={<RamenDiningIcon sx={{ color: theme.palette.primary.main }} />}
//                                             >
//                                                 <Typography>{cart.name}</Typography>
//                                             </AccordionSummary>
//                                             <AccordionDetails>
//                                                 <Typography>{cart.description}</Typography>
//                                             </AccordionDetails>
//                                         </Accordion>
//                                         <Stack
//                                             direction='row'
//                                             alignItems='center'
//                                             justifyContent='space-between'
//                                             sx={shopStyles.stack2}
//                                         >
//                                             <Button
//                                                 size='large'
//                                                 variant='text'
//                                                 onClick={() => updateQuantity(cart.id, '-')}
//                                             >
//                                                 -
//                                             </Button>
//                                             <Typography variant='h6' sx={{ color: 'white' }}>
//                                                 {cart.quantity}
//                                             </Typography>
//                                             <Button
//                                                 size='large'
//                                                 variant='text'
//                                                 onClick={() => updateQuantity(cart.id, '+')}
//                                             >
//                                                 +
//                                             </Button>
//                                         </Stack>
//                                         <Button
//                                             variant='outlined'
//                                             size='medium'
//                                             sx={shopStyles.button}
//                                             onClick={() => updateCart(cart)}
//                                         >
//                                             Update Quantity - ${(cart.quantity * parseFloat(cart.price)).toFixed(2)}
//                                         </Button>
//                                         <Button
//                                             variant='outlined'
//                                             size='medium'
//                                             sx={shopStyles.button}
//                                             onClick={() => deleteItem(cart)}
//                                         >
//                                             Delete Item from Cart
//                                         </Button>
//                                     </Stack>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Stack direction='column' sx={{ width: '75%', marginTop: '100px' }}>
//                     <Typography variant='h4' sx={{ marginRight: '20px' }}>
//                         Your Orders
//                     </Typography>
//                     <Order />
//                 </Stack>
//             </Stack>
//             <Snackbar
//                 open={open}
//                 autoHideDuration={2000}
//                 onClose={() => setOpen(false)}
//             >
//                 <Alert severity={messageType}>
//                     {message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     )
// }