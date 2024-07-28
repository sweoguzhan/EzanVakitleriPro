import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCountries,
  fetchCities,
  fetchDistricts,
  fetchPrayerTimes,
} from '../redux/prayerTimesSlice';
import {useNavigation} from '@react-navigation/native';
import {Box, Center, Select, CheckIcon, Button, Text} from 'native-base';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {countries, cities, districts, loading, error} = useSelector(
    state => state.prayerTimes,
  );

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryChange = countryId => {
    setSelectedCountry(countryId);
    setSelectedCity('');
    setSelectedDistrict('');
    dispatch(fetchCities(countryId));
  };

  const handleCityChange = cityId => {
    setSelectedCity(cityId);
    setSelectedDistrict('');
    dispatch(fetchDistricts(cityId));
  };

  const handleDistrictChange = districtId => {
    setSelectedDistrict(districtId);
  };

  const handleFetchPrayerTimes = () => {
    if (selectedDistrict) {
      dispatch(fetchPrayerTimes(selectedDistrict)).then(action => {
        if (action.type === 'prayerTimes/fetchPrayerTimes/fulfilled') {
          navigation.navigate('Home');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <Center>
          <Box maxW="300" w="100%">
            <Select
              selectedValue={selectedCountry}
              minWidth="200"
              accessibilityLabel="Choose Country"
              placeholder="Choose Country"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => handleCountryChange(itemValue)}>
              {countries.map(country => (
                <Select.Item
                  key={country.UlkeID}
                  label={country.UlkeAdi}
                  value={country.UlkeID}
                />
              ))}
            </Select>
          </Box>
          <Box maxW="300" w="100%" mt={3}>
            <Select
              selectedValue={selectedCity}
              minWidth="200"
              accessibilityLabel="Choose City"
              placeholder="Choose City"
              isDisabled={!selectedCountry}
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => handleCityChange(itemValue)}>
              {cities.map(city => (
                <Select.Item
                  key={city.SehirID}
                  label={city.SehirAdi}
                  value={city.SehirID}
                />
              ))}
            </Select>
          </Box>
          <Box maxW="300" w="100%" mt={3}>
            <Select
              selectedValue={selectedDistrict}
              minWidth="200"
              accessibilityLabel="Choose District"
              placeholder="Choose District"
              isDisabled={!selectedCity}
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => handleDistrictChange(itemValue)}>
              {districts.map(district => (
                <Select.Item
                  key={district.IlceID}
                  label={district.IlceAdi}
                  value={district.IlceID}
                />
              ))}
            </Select>
          </Box>
          <Button
            mt={5}
            onPress={handleFetchPrayerTimes}
            isDisabled={!selectedDistrict}>
            Fetch Prayer Times
          </Button>
        </Center>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default SettingsPage;
