// // src\components\Exotics\Exotics.tsx

// import * as _React from 'react';
// import { useState, useEffect } from 'react';
// import { fetchCarDetails } from '../../api/exoticsApi';
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardMedia,
//   Typography,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CardContent,
//   Grid,
// } from '@mui/material';

// interface IManufacturer {
//   /**
//    * The name of the manufacturer
//    */
//   name: string;
//   /**
//    * The URL of the logo for the manufacturer
//    */
//   logo: string;
// }

// interface ICarDetail {
//   make: string;
//   model: string;
//   year: number;
// }

// // Add your actual manufacturers here
// const manufacturers: IManufacturer[] = [
//   { name: 'Lamborghini', logo: '/assets/images/logo_lamborghini.png' },
//   { name: 'Ferrari', logo: '/assets/images/logo_ferrari.png' },
//   { name: 'Aston Martin', logo: '/assets/images/logo_aston_martin.png' },
//   { name: 'Audi', logo: '/assets/images/logo_audi.png' },
//   { name: 'Bugatti', logo: '/assets/images/logo_bugatti.png' },
//   { name: 'Koenigsegg', logo: '/assets/images/logo_koenigsegg.png' },
//   { name: 'Lexus', logo: '/assets/images/logo_lexus.png' },
//   { name: 'Maserati', logo: '/assets/images/logo_maserati.png' },
//   { name: 'McLaren', logo: '/assets/images/logo_mclaren.png' },
//   { name: 'Mercedes-Benz', logo: '/assets/images/logo_mercedes-benz.png' },
//   { name: 'Pagani', logo: '/assets/images/logo_pagani.png' },
//   { name: 'Porsche', logo: '/assets/images/logo_porsche.png' },
// ];


// /**
//  * Functional component for selecting an exotic car, including manufacturer, model, and year options.
//  *
//  * @return {ReactNode} The JSX for the exotic car selection interface
//  */
// const Exotics: React.FC = () => {
//   const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
//   const [carDetails, setCarDetails] = useState<ICarDetail[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedModel, setSelectedModel] = useState<string>('');
//   const [selectedYear, setSelectedYear] = useState<string>('');
//   const [modelOptions, setModelOptions] = useState<string[]>([]);
//   const [yearOptions, setYearOptions] = useState<number[]>([]);
  
//   useEffect(() => {
//     if (selectedManufacturer) {
//       setLoading(true);
//       setError(null);
//       fetchCarDetails(selectedManufacturer)
//         .then(data => {
//           // Since data is an array of ICarDetail, TypeScript should not throw an error here
//           setCarDetails(data);
//           const models = Array.from(new Set(data.map(car => car.model)));
//           setModelOptions(models);
//           setSelectedModel('');
//           setSelectedYear('');
//         })
//         .catch(error => {
//           console.error('Failed to fetch car details:', error);
//           setError('Failed to fetch car details. Please try again later.');
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [selectedManufacturer]);

//   useEffect(() => {
//     // When a model is selected, update year options
//     const years = carDetails
//       .filter((car) => car.model === selectedModel)
//       .map((car) => car.year)
//       .filter((value, index, self) => self.indexOf(value) === index);
//     setYearOptions(years);
//   }, [selectedModel, carDetails]);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 2 }}>
//       <Typography variant="h4" gutterBottom>Select Your Exotic Car</Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {manufacturers.map((manufacturer) => (
//             <Grid item xs={12} sm={6} md={4} key={manufacturer.name}>
//               <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => setSelectedManufacturer(manufacturer.name)}>
//                 <CardActionArea>
//                   <CardMedia component="img" height="140" image={manufacturer.logo} alt={manufacturer.name} />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {manufacturer.name}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//       {modelOptions.length > 0 && (
//         <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
//           <InputLabel>Model</InputLabel>
//           <Select value={selectedModel} label="Model" onChange={(e) => setSelectedModel(e.target.value)}>
//             {modelOptions.map((model) => (
//               <MenuItem key={model} value={model}>{model}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}
//       {yearOptions.length > 0 && (
//         <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
//           <InputLabel>Year</InputLabel>
//           <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}
//     </Box>
//   );
// };

// export default Exotics;
