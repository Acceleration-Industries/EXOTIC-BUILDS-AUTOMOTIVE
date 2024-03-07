import * as React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { NavBar } from '../sharedComponents/NavBar';

// Updated paths for Lexus images
import lexusLogo from '../../assets/images/lexus_emblem_green.png';
import lexusLc500 from '../../assets/images/lexus_lc500.png';
import lexusLfaRed from '../../assets/images/lexus_lfa_red.png';
import lexusLfaWhite from '../../assets/images/lexus_lfa_white.png';
import background from '../../assets/images/black_green_honeycomb.png';

interface CarModel {
  name: string;
  image: string;
  price: string;
}

// Updated Lexus models data
const carModels: CarModel[] = [
  { name: 'Lexus LFA', image: lexusLfaRed, price: '$1,250,000' },
  { name: 'Lexus LFA', image: lexusLfaWhite, price: '$1,250,000' },
  { name: 'Lexus LC500', image: lexusLc500, price: '$150,000' },
];

const Lexus: React.FC = () => {
  return (
    <Box sx={{
      backgroundImage: `url(${background})`,
      minHeight: '100vh',
      paddingTop: '10vh',
      textAlign: 'center',
    }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: '-32px', overflow: 'hidden', mb: '200px' }}>
        <div style={{
          width: '100%',
          height: '150px',
          backgroundImage: `url(${lexusLogo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          margin: '0 auto',
          marginBottom: '5rem',
        }} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {carModels.map((model, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                backgroundColor: 'rgba(0,0,0,0.7)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 20px 30px rgba(50, 205, 50, 0.5)',
                },
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
              }}>
                <CardMedia
                  component="img"
                  image={model.image}
                  alt={model.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    marginBottom: '20px',
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ color: '#00be00', textAlign: 'center' }}>
                    {model.name}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'center', color: 'white' }}>
                    Price: {model.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Typography sx={{
        fontSize: '1rem',
        color: '#00be00', // Keeping the bottom text color as specified
        fontWeight: 'bold',
        position: 'absolute',
        bottom: '5px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        Book a test drive! Call (888) EXOTICS
      </Typography>
    </Box>
  );
};

export default Lexus;
