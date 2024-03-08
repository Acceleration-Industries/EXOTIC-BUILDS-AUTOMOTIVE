import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, IconButton, Typography, Button, Drawer, ListItemButton, List, ListItemText, Divider, Box, ListItemIcon,
} from '@mui/material';
import { Theme, SxProps } from '@mui/system';
import menuIcon from '../../../assets/images/green_menu_coin.png';
import homeIcon from '../../../assets/images/green_temple_home.png';
import performancePartsIcon from '../../../assets/images/hd_turbo.png';
import shopExoticsIcon from '../../../assets/images/shop_exotics_icon.png';
import cartIcon from '../../../assets/images/green_hd_cart.png';
import { signOut, getAuth, Auth } from 'firebase/auth';
import logo from '../../../assets/images/EXOTIC_BUILDS_LOGO.png';

type NavLink = {
    text: string;
    icon: JSX.Element | null;
    onClick: () => void;
};

const drawerWidth = 300;
const navStyles: { [key: string]: SxProps<Theme> } = {

};

export const NavBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth: Auth = getAuth();
    const myAuth: string | null = localStorage.getItem('auth');

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const navLinks: NavLink[] = [
        {
            text: 'Home',
            icon: <Box component="img" src={homeIcon} alt="Home" sx={{ width: 70, height: 80, marginRight: 5.5, marginLeft: 3.5, }} />,
            onClick: () => navigate('/'),
        },
        {
            text: myAuth === 'true' ? 'Parts' : 'Sign In',
            icon: myAuth === 'true' ? <Box component="img" src={performancePartsIcon} alt="Performance Parts" sx={{ width: 80, height: 65, marginRight: 6, marginLeft: 2, }} /> : <Box component="img" src={homeIcon} alt="Sign In" sx={{ width: 24, height: 24 }} />,
            onClick: () => navigate(myAuth === 'true' ? '/shop' : '/auth'),
        },
        {
            text: 'Exotics',
            icon: <Box component="img" src={shopExoticsIcon} alt="Shop Exotics" sx={{ width: 120, height: 55, marginRight: 3, }} />,
            onClick: () => navigate('/makes'),
        },
        {
            text: myAuth === 'true' ? 'Cart' : '',
            icon: myAuth === 'true' ? <Box component="img" src={cartIcon} alt="Cart" sx={{ width: 85, height: 60, marginRight: 6, marginLeft: 2, }} /> : null,
            onClick: myAuth === 'true' ? () => navigate('/cart') : () => { },
        },
    ];

    let buttonText: string = myAuth === 'true' ? 'Sign Out' : 'Sign In';

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
            <AppBar position="fixed" sx={{
                ...((open ? navStyles.appBarShift : navStyles.appBar) || {}),
                borderBottom: '2px solid lime',
            }}>

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
                        <Box
                            component="img"
                            src={menuIcon}
                            alt="Menu"
                            sx={{ width: 50, height: 50 }}
                        />
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
                            fontSize: '30px',
                            marginLeft: '500px',
                        }}
                    >
                        EXOTIC BUILDS AUTOMOTIVE
                        <Box
                            component="img"
                            src={logo}
                            sx={{
                                height: 50,
                                marginLeft: 33,
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
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'lime' }}>
                        <Box
                            component="img"
                            src={menuIcon}
                            alt="Menu"
                            sx={{ width: 50, height: 50 }}
                        />
                    </IconButton>
                </Box>

                <Divider sx={{ borderColor: 'lime' }} />
                <List>
                    {navLinks.map(({ text, icon, onClick }) => (
                        <ListItemButton key={text} onClick={onClick}>
                            {icon && <ListItemIcon sx={{ color: 'lime' }}>{icon}</ListItemIcon>}
                            <ListItemText primary={text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

        </Box>
    );
};