import * as React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { NavBar } from '../sharedComponents/NavBar';

// Updated paths for Maserati images
import maseratiLogo from '../../assets/images/maserati_freen_logo.png';
import maseratiGranTurismo from '../../assets/images/Maserati_Liberty_Walk_Gran_Turismo_Red.png';
import maseratiMC12Corsa from '../../assets/images/maserati_mc12_corsa.png';
import maseratiMC20 from '../../assets/images/Maserati_mc20.png';
import background from '../../assets/images/black_green_honeycomb.png';

interface CarModel {
  name: string;
  image: string;
  price: string;
}

// Updated Maserati models data
const carModels: CarModel[] = [
  { name: 'Maserati Gran Turismo', image: maseratiGranTurismo, price: '$150,000' },
  { name: 'Maserati MC12 Corsa', image: maseratiMC12Corsa, price: '$2,800,000' },
  { name: 'Maserati MC20', image: maseratiMC20, price: '$210,000' }, // Adjusted the price as per typical market expectations
];

const Maserati: React.FC = () => {
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
          backgroundImage: `url(${maseratiLogo})`,
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
        color: '#00be00', // Keep the bottom text color as per the previous setup
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

export default Maserati;
