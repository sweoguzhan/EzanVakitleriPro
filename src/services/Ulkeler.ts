import axios from 'axios';
import {Ulke} from '../types/Ulkeler.ts';

const BASE_URL = 'https://ezanvakti.herokuapp.com';

export const fetchUlkeler = async (): Promise<Ulke[]> => {
  const response = await axios.get(`${BASE_URL}/ulkeler`);
  return response.data;
};
