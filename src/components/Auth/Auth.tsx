import * as _React from 'react';
import { useState } from 'react'; 

import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Stack,
    Snackbar,
    CircularProgress,
    Dialog, 
    DialogContent,
    Alert 
} from '@mui/material'
import { NavBar, InputText, InputPassword } from '../sharedComponents';
import backgroundVideo from '../../assets/images/Background - Made with Clipchamp (1).mp4';
const VideoBackground = () => {
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {}
    </Box>
  );
};
export default VideoBackground;
const authStyles = {
    main: {
        // backgroundImage: `linear-gradient(rgba(0,0,0, .3), rgba(0,0,0,.5)), (${backgroundVideo})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 5px',
        position: 'absolute',
        marginTop: '10px'
    },
    stack: {
        width: '400px',
        marginTop: '100px',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'white'
    },
    button: {
        width: '175px',
        fontSize: '14px'
    }
}
interface Props {
    title: string
}
interface ButtonProps {
    open: boolean
    onClick: () => void
}
interface SubmitProps {
    email: string
    password: string
}
export type MessageType = 'error' | 'warning' | 'info' | 'success'
const GoogleButton = (_props: ButtonProps ) => {
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const [ signInWithGoogle, _user, loading, error ] = useSignInWithGoogle(auth)
    const signIn = async () => {
        await signInWithGoogle()
        localStorage.setItem('auth', 'true')
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            }
        })
        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }
        if (loading) {
            return <CircularProgress />
        }
    }
    return (
        <Box>
            <Button
                variant='contained'
                color='info'
                size = 'large'
                sx = { authStyles.button }
                onClick = { signIn }
            >
               Sign In With Google 
            </Button>
            <Snackbar
                open = { open }
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = { messageType }>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
const SignIn = () => {
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const { register, handleSubmit } = useForm<SubmitProps>()
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            });
    }
    return (
        <Box>
            <form onSubmit = { handleSubmit(onSubmit) }>
                <Typography variant='h6'>Sign Into Your Account</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={ open }
                autoHideDuration= {2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
const SignUp = () => {
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const { register, handleSubmit } = useForm<SubmitProps>()
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            });
    }
    return (
        <Box>
            <form onSubmit = { handleSubmit(onSubmit) }>
                <Typography variant='h6'>Sign Up for Free!</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={ open }
                autoHideDuration= {2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
export const Auth = (props: Props) => {
    const [ open, setOpen ] = useState(false)
    const [ signType, setSignType ] = useState<'signin' | 'signup'>()
    return (
      <Box>
    <NavBar />
    <Box sx={authStyles.main}>
        <Stack
            direction='column'
            alignItems='center'
            textAlign='center'
            sx={authStyles.stack}
        >
            <Typography variant='h3'>
                {props.title}
            </Typography>
            <br />
            <Typography variant='subtitle1'>
                - Shop - create - customize -
            </Typography>
            <br />
            <GoogleButton open={open} onClick={ () => setOpen(false)} />
            <br />
            <Stack
                width='100%'
                alignItems='center'
                justifyContent='center'
                direction='row'
            >
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{ ...authStyles.button, padding: '12px 30px' }}
                    onClick={() => { setOpen(true); setSignType('signin') }}
                >
                    Email Login
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{ ...authStyles.button, padding: '12px 30px' }}
                    onClick={() => { setOpen(true); setSignType('signup') }}
                >
                    Email Signup
                </Button>
            </Stack>
        </Stack>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                sx: {
                    backgroundColor: 'black',
                    borderRadius: '10px',
                    border: '1px solid white',
                    boxShadow: '0 0 10px white',
                }
            }}
        >
            <DialogContent>
                {signType === 'signin' ? <SignIn /> : <SignUp />}
            </DialogContent>
        </Dialog>
    </Box>
</Box>

    )
}