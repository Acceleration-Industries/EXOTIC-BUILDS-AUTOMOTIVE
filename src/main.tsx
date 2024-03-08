import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ThemeProvider } from "@mui/material/styles";
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';
import { Home, Shop, Cart, Auth, Makes } from './components';
import './index.css';
import { theme } from './Theme/themes';
import { firebaseConfig } from './firebaseConfig';
import Lamborghini from './components/Lamborghini/Lamborghini';
import Porsche from './components/Porsche/Porsche';
import Pagani from './components/Pagani/Pagani';
import Mercedes from './components/Mercedes/Mercedes';
import McLaren from './components/McLaren/McLaren';
import Maserati from './components/Maserati/Maserati';
import Lexus from './components/Lexus/Lexus';
import Koenigsegg from './components/Koenigsegg/Koenigsegg';
import Jaguar from './components/Jaguar/Jaguar';
import Hennessey from './components/Hennessey/Hennessey';
import Ferrari from './components/Ferrari/Ferrari';
import Bugatti from './components/Bugatti/Bugatti';
import BMW from './components/BMW/BMW';
import Audi from './components/Audi/Audi';
import AstonMartin from './components/AstonMartin/AstonMartin';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home title={""} />} />
            <Route path='/auth' element={<Auth title={""} />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/makes' element={<Makes />} />
            <Route path='/lamborghini' element={<Lamborghini />} />
            <Route path='/porsche' element={<Porsche />} />
            <Route path='/pagani' element={<Pagani />} />
            <Route path='/mercedes' element={<Mercedes />} />
            <Route path='/mclaren' element={<McLaren />} />
            <Route path='/maserati' element={<Maserati />} />
            <Route path='/lexus' element={<Lexus />} />
            <Route path='/koenigsegg' element={<Koenigsegg />} />
            <Route path='/jaguar' element={<Jaguar />} />
            <Route path='/hennessey' element={<Hennessey />} />
            <Route path='/ferrari' element={<Ferrari />} />
            <Route path='/bugatti' element={<Bugatti />} />
            <Route path='/bmw' element={<BMW />} />
            <Route path='/audi' element={<Audi />} />
            <Route path='/astonmartin' element={<AstonMartin />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
