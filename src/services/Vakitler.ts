import axios from 'axios';

import {Vakit} from '../types/Vakitler.ts';

const BASE_URL = 'https://ezanvakti.herokuapp.com';

export const fetchVakitler = async (ilceId: string): Promise<Vakit[]> => {
  const response = await axios.get<Vakit[]>(`${BASE_URL}/vakitler/${ilceId}`);
  return response.data;
};
