// AstonMartin.tsx
import * as React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { NavBar } from '../sharedComponents/NavBar';

// Importing Aston Martin images
import astonLogo from '../../assets/images/astonmartin_green_logo2.png';
import astonDB11 from '../../assets/images/aston_db11.png';
import astonDBSSuperleggera from '../../assets/images/aston_dbs_superleggera.png';
import astonVulcan from '../../assets/images/astonmartin_vulcan.png';
import background from '../../assets/images/black_green_honeycomb.png';

interface CarModel {
  name: string;
  image: string;
  price: string;
}


const carModels: CarModel[] = [
  { name: 'Aston Martin DBS Superleggera', image: astonDBSSuperleggera, price: '$320,000' },
  { name: 'Aston Martin DB11', image: astonDB11, price: '$215,000' },
  { name: 'Aston Martin Vantage GT', image: astonVulcan, price: '$2,300,000' },
];

const AstonMartin: React.FC = () => {
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
          backgroundImage: `url(${astonLogo})`,
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
        color: '#00be00', // Adjust this color as needed
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

export default AstonMartin;
