import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { NavBar } from '../sharedComponents';

import porscheLogo from '../../assets/images/logo_porsche.png';
import paganiLogo from '../../assets/images/logo_pagani.png';
import mercedesBenzLogo from '../../assets/images/logo_mercedes-benz.png';
import mclarenLogo from '../../assets/images/logo_mclaren.png';
import maseratiLogo from '../../assets/images/logo_maserati.png';
import lexusLogo from '../../assets/images/logo_lexus.png';
import lamborghiniLogo from '../../assets/images/logo_lamborghini.png';
import koenigseggLogo from '../../assets/images/logo_koenigsegg.png';
import jaguarLogo from '../../assets/images/logo_jaguar.png';
import hennesseyLogo from '../../assets/images/logo_hennessey.png';
import ferrariLogo from '../../assets/images/logo_ferrari.png';
import bugattiLogo from '../../assets/images/logo_bugatti.png';
import bmwLogo from '../../assets/images/logo_bmw.png';
import audiLogo from '../../assets/images/logo_audi.png';
import astonMartinLogo from '../../assets/images/logo_aston_martin.png';

interface CarMake {
  name: string;
  logo: string;
}

const carMakesData: CarMake[] = [
  { name: 'Porsche', logo: porscheLogo },
  { name: 'Pagani', logo: paganiLogo },
  { name: 'Mercedes', logo: mercedesBenzLogo },
  { name: 'McLaren', logo: mclarenLogo },
  { name: 'Maserati', logo: maseratiLogo },
  { name: 'Lexus', logo: lexusLogo },
  { name: 'Lamborghini', logo: lamborghiniLogo },
  { name: 'Koenigsegg', logo: koenigseggLogo },
  { name: 'Jaguar', logo: jaguarLogo },
  { name: 'Hennessey', logo: hennesseyLogo },
  { name: 'Ferrari', logo: ferrariLogo },
  { name: 'Bugatti', logo: bugattiLogo },
  { name: 'BMW', logo: bmwLogo },
  { name: 'Audi', logo: audiLogo },
  { name: 'Aston Martin', logo: astonMartinLogo },
];

export const Makes: React.FC = () => {
  const navigate = useNavigate();

  const handleCarSelect = (carMake: string) => {

    if (carMake === 'Aston Martin') {

      navigate(`/astonmartin`);
    } else {
 
      navigate(`/${carMake.toLowerCase()}`);
    }
  };

  return (
    <div>
      <NavBar />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EXOTIC BUILDS AUTOMOTIVE
          </Typography>
          <Button color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ justifyContent: 'center', padding: '16px' }}>
        {carMakesData.map((carMake) => (
          <Grid item key={carMake.name} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '341px',
                height: '249px',
                paddingTop: '20px',
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid white',
                boxShadow: '0 0 10px lime',
                '&:hover': {
                  boxShadow: '0 0 15px lime',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardActionArea onClick={() => handleCarSelect(carMake.name)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{ maxHeight: 240, maxWidth: 180, objectFit: 'contain' }}
                  image={carMake.logo}
                  alt={carMake.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" sx={{ textAlign: 'center' }}>
                    {carMake.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
