import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchUlkeler as fetchCountriesService} from '../services/Ulkeler';
import {fetchSehirler as fetchCitiesService} from '../services/Sehirler';
import {fetchIlceler as fetchDistrictsService} from '../services/Ilceler';
import {fetchVakitler as fetchPrayerTimesService} from '../services/Vakitler';

export const fetchCountries = createAsyncThunk(
  'prayerTimes/fetchCountries',
  async () => {
    const data = await fetchCountriesService();
    return data;
  },
);

export const fetchCities = createAsyncThunk(
  'prayerTimes/fetchCities',
  async countryId => {
    const data = await fetchCitiesService(countryId);
    return data;
  },
);

export const fetchDistricts = createAsyncThunk(
  'prayerTimes/fetchDistricts',
  async cityId => {
    const data = await fetchDistrictsService(cityId);
    return data;
  },
);

export const fetchPrayerTimes = createAsyncThunk(
  'prayerTimes/fetchPrayerTimes',
  async districtId => {
    const data = await fetchPrayerTimesService(districtId);
    return data;
  },
);

const prayerTimesSlice = createSlice({
  name: 'prayerTimes',
  initialState: {
    countries: [],
    cities: [],
    districts: [],
    prayerTimes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCities.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })
      .addCase(fetchDistricts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPrayerTimes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrayerTimes.fulfilled, (state, action) => {
        state.loading = false;
        state.prayerTimes = action.payload;
      })
      .addCase(fetchPrayerTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default prayerTimesSlice.reducer;
