// exoticbuildsautomotive_website\src\components\Shop\Shop.tsx
import * as _React from 'react';
import { useState } from 'react';
type MessageType = 'error' | 'warning' | 'info' | 'success';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Snackbar,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getDatabase, ref, push } from 'firebase/database';
import { useGetShop, ShopProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import {  } from '../Auth';
export interface SubmitProps {
    quantity: string;
}
interface CartProps {
    cartItem: ShopProps;
}
export const shopStyles = {
    main: {
   
    },
    grid: {
        marginTop: '25px',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '80vw',
    },
    card: {
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        backgroundColor: 'black',
        border: '3px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
    },
    cardMedia: {
        width: '100%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '2',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
    },
    button: {
        color: '',
        borderRadius: '50px',
        height: '45px',
        width: '250px',
        marginTop: '10px'
    },
    stack: {
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    stack2: {
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '50px',
        width: '100%',
        marginTop: '10px'
    },
    typography: {
        marginLeft: '15vw',
        color: "white",
      
    }
};
const AddToCart = (cart: CartProps) => {
    const db = getDatabase();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>();
    const [messageType, setMessageType] = useState<MessageType>();
    const { register, handleSubmit } = useForm<SubmitProps>();
    let myCart = cart.cartItem;
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        event?.preventDefault();
        const userId = localStorage.getItem('uuid');
        const cartRef = ref(db, `carts/${userId}/`);
        myCart.quantity = parseInt(data.quantity);
        push(cartRef, myCart)
            .then(() => {
                setMessage(`Successfully added item ${myCart.name} to Cart`);
                setMessageType('success');
                setOpen(true);
            })
            .catch((error) => {
                setMessage(error.message);
                setMessageType('error');
                setOpen(true);
            });
    };
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor='quantity'>{myCart.name}</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='ENTER QUANTITY' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Alert severity={messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    );
};
export const Shop = () => {
    const { shopData } = useGetShop();
    const [currentShop, setCurrentShop] = useState<ShopProps>();
    const [cartOpen, setCartOpen] = useState(false);
    return (
        <Box sx={shopStyles.main}>
            <NavBar />
            <Typography variant='h4' sx={shopStyles.typography}>
                EXOTIC BUILDS FOR SALE
            </Typography>
            <Grid container spacing={3} sx={shopStyles.grid}>
                {shopData.map((shop: ShopProps, index: number) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={shopStyles.card}>
                            <CardMedia component='img' sx={shopStyles.cardMedia} image={shop.image} alt={shop.name} />
                            <CardContent>
                                <Stack direction='column' justifyContent='space-between' alignItems='center'>
                                    <Accordion sx={{ color: 'white', width: '100%', backgroundColor: theme.palette.secondary.light }}>
                                        <AccordionSummary expandIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}>
                                            <Typography>{shop.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>{shop.description}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Button variant='outlined' size='medium' sx={shopStyles.button} onClick={() => { setCartOpen(true); setCurrentShop(shop); }}>
                                        Add to Cart - ${parseFloat(shop.price).toFixed(2)}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={cartOpen} onClose={() => setCartOpen(false)}>
                <DialogContent>
                    <DialogContentText>Add to Cart</DialogContentText>
                    {currentShop && <AddToCart cartItem={currentShop} />}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

