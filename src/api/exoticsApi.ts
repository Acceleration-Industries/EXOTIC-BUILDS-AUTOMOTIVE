// /src/api/exoticsApi.ts
import axios from 'axios';

interface ICarDetail {
  make: string;
  model: string;
  year: number;
}

export const fetchCarDetails = async (manufacturer: string): Promise<ICarDetail[]> => {
  try {
    const response = await axios.get('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars', {
      params: { make: manufacturer },
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch car details:', error);
    throw new Error('Failed to fetch car details');
  }
};
