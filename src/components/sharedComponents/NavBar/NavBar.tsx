import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, IconButton, Typography, Button, Drawer, ListItemButton, List, ListItemText, Divider, Box, ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TuneIcon from '@mui/icons-material/Tune';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut, getAuth } from 'firebase/auth';
import { theme } from '../../../Theme/themes';
import logo from '../../../assets/images/EXOTIC_BUILDS_LOGO.png';


const drawerWidth = 240;

const navStyles = {
    appBar: {
        backgroundColor: "#000000",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
};

export const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const myAuth = localStorage.getItem('auth');

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const navLinks = [
        {
            text: 'Home',
            icon: <DirectionsCarIcon />,
            onClick: () => navigate('/'),
        },
        {
            text: myAuth === 'true' ? 'Shop' : 'Sign In',
            icon: myAuth === 'true' ? <TuneIcon /> : <ExitToAppIcon />,
            onClick: () => navigate(myAuth === 'true' ? '/shop' : '/auth'),
        },
        {
            text: myAuth === 'true' ? 'Cart' : '',
            icon: myAuth === 'true' ? <ShoppingCartIcon /> : null,
            onClick: myAuth === 'true' ? () => navigate('/cart') : () => { },
        },
        // Updated entry for "Shop Exotics"
        {
            text: 'Shop Exotics',
            icon: <DirectionsCarIcon />,
            onClick: () => navigate('/makes'), // This line was updated to match the route to Makes.tsx
        },
    ];
    

    let buttonText = myAuth === 'true' ? 'Sign Out' : 'Sign In';

    const signInButton = async () => {
        if (myAuth === 'false') {
            navigate('/auth');
        } else {
            await signOut(auth);
            localStorage.setItem('auth', 'false');
            localStorage.setItem('user', "");
            localStorage.setItem('uuid', "");
            navigate('/');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={open ? navStyles.appBarShift : navStyles.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            ...(open ? navStyles.hide : navStyles.menuButton),
                            color: 'lime',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'lime',
                            textShadow: '2px 2px 4px black',
                        }}
                    >
                        EXOTIC BUILDS AUTOMOTIVE
                        <Box
                            component="img"
                            src={logo}
                            sx={{
                                height: 30,
                                marginLeft: 2,
                                filter: 'drop-shadow(2px 2px 4px black)',
                            }}
                            alt="Exotic Builds Logo"
                        />
                    </Typography>
                    <Button
                        color="primary"
                        onClick={signInButton}
                        sx={{
                            borderColor: 'limegreen',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            color: 'lime',
                            textShadow: '2px 2px 4px black',
                            '&:hover': {
                                borderColor: 'limegreen',
                                backgroundColor: 'rgba(50, 205, 50, 0.04)',
                                color: 'lime',
                            },
                        }}
                        variant="outlined"
                    >
                        {buttonText}
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: 'black',
                        color: 'lime',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box sx={{ justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'lime' }}> {}
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: 'lime' }} /> {}
                <List>
                    {navLinks.map(({ text, icon, onClick }) => (
                        <ListItemButton key={text} onClick={onClick}>
                            {icon && <ListItemIcon sx={{ color: 'lime' }}>{icon}</ListItemIcon>} {}
                            <ListItemText primary={text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

        </Box>
    );
};
