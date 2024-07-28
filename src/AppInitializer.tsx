import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCities,
    fetchCountries,
    fetchDistricts,
    fetchPrayerTimes,
    SelectedCity,
    SelectedCountry,
    SelectedDistrict
} from './redux/prayerTimesSlice';
import { RootState } from './redux/store';

interface AppInitializerProps {
    children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { country, city, district } = useSelector((state: RootState) => state.prayerTimes);

    useEffect(() => {
        if (!country) {
            // Varsayılan değerler
            const defaultCountry = 2; // Türkiye ID
            const defaultCity = 500; // İstanbul ID
            const defaultDistrict = 2; // Kartal ID

            dispatch(SelectedCountry(defaultCountry));
            dispatch(SelectedCity(defaultCity));
            dispatch(SelectedDistrict(defaultDistrict));

            dispatch(fetchCountries());
            dispatch(fetchCities(defaultCountry));
            dispatch(fetchDistricts(defaultCity));
            dispatch(fetchPrayerTimes(defaultDistrict));
        }
    }, [dispatch, country, city, district]);

    return <>{children}</>;
};

export default AppInitializer;
