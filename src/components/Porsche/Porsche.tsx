import * as React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { NavBar } from '../sharedComponents/NavBar';

// Updated Porsche image imports
import porscheLogo from '../../assets/images/porsche_green_logo.png';
import porsche911Turbo from '../../assets/images/porsche_911_turbo.png';
import porsche918 from '../../assets/images/porsche_918.png';
import porscheGemballaMirageGT from '../../assets/images/porsche_gemballa_mirage_gt.png';
import background from '../../assets/images/black_green_honeycomb.png';

interface CarModel {
  name: string;
  image: string;
  price: string;
}

// Updated carModels array for Porsche
const carModels: CarModel[] = [
  { name: 'Porsche 911 Turbo S', image: porsche911Turbo, price: '$275,000' },
  { name: 'Porsche Carrera GT', image: porscheGemballaMirageGT, price: '$1,750,000' },
  { name: 'Porsche 918', image: porsche918, price: '$1,999,000' },
];

const Porsche: React.FC = () => {
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
          backgroundImage: `url(${porscheLogo})`,
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
        color: '#FFFFFF',
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

export default Porsche;
