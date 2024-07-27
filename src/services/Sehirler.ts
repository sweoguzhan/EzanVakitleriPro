import axios from 'axios';

import {Sehir} from '../types/Sehirler.ts';

const BASE_URL = 'https://ezanvakti.herokuapp.com';

export const fetchSehirler = async (ulkeID: string): Promise<Sehir[]> => {
  const response = await axios.get<Sehir[]>(`${BASE_URL}/sehirler/${ulkeID}`);
  return response.data;
};
