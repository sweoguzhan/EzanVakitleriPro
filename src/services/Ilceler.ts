import axios from 'axios';
import {Ilce} from '../types/Ilceler.ts';

const BASE_URL = 'https://ezanvakti.herokuapp.com';

export const fetchIlceler = async (sehirId: string): Promise<Ilce[]> => {
  const response = await axios.get(`${BASE_URL}/ilceler?sehir=${sehirId}`);
  return response.data;
};
