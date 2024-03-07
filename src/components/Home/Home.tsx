import * as _React from 'react'; 
import { styled } from '@mui/system'; 
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 
import backgroundVideo from '../../assets/images/Background - Made with Clipchamp (1).mp4';
import { NavBar } from '../sharedComponents';
interface Props {
    title: string;
}
const Root = styled('div')({
    padding: 0,
    margin: 0
});
const Main = styled('main')({
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
});
const MainText = styled('div')({
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
});
export const Home = (props: Props) => {
    const myAuth = localStorage.getItem('auth');
    return (
        <Root>
            <NavBar />
            <Main>
                <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', objectFit: 'cover' }}>
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <MainText>
                    <Typography variant='h4'>{props.title}</Typography>
                    <Button sx={{ marginTop: '10px' }} component={Link} to={myAuth === 'true' ? "/shop" : "/auth"} variant='contained'>
                       BROWSE OUR STORE
                    </Button>
                </MainText>
            </Main>
        </Root>
    );
};
