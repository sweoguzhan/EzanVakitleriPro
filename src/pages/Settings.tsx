import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCountries,
  fetchCities,
  fetchDistricts,
  fetchPrayerTimes,
  SelectedCountry,
  SelectedCity,
  SelectedDistrict,
} from '../redux/prayerTimesSlice';
import { useNavigation } from '@react-navigation/native';
import { Box, Center, Select, CheckIcon, Button, Text } from 'native-base';
import {SvgXml} from "react-native-svg";
import {ArrowLeft} from "../assets/icons/ArrowLeft";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { countries, cities, districts, loading, error,city,country,district } = useSelector(
      state => state.prayerTimes,
  );
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  useEffect(() => {
    dispatch(fetchCountries());
    if(country && city && district){
      setSelectedCountry(country);
        setSelectedCity(city);
        setSelectedDistrict(district);
    }
  }, [dispatch]);
  const handleCountryChange = (countryId:any) => {
    setSelectedCountry(countryId);
    setSelectedCity('');
    setSelectedDistrict('');
    dispatch(SelectedCountry(countryId));
    dispatch(fetchCities(countryId));
  };
  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    setSelectedDistrict('');
    dispatch(SelectedCity(cityId));
    dispatch(fetchDistricts(cityId));
  };
  const handleDistrictChange = (districtId:any) => {
    setSelectedDistrict(districtId);
    dispatch(SelectedDistrict(districtId));
  };
  const handleFetchPrayerTimes = () => {
    if (selectedDistrict) {
      dispatch(fetchPrayerTimes(selectedDistrict)).then((action:any) => {
        if (action.type === 'prayerTimes/fetchPrayerTimes/fulfilled') {
          navigation.navigate('Home');
        }
      });
    }
  };
  const goBackHome = () => {
      navigation.navigate('Home');
  }
  return (
      <SafeAreaView style={styles.container}>
        {loading &&
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && (
            <>
              <View style={styles.headerView}>
                <TouchableOpacity onPress={goBackHome}>
                  <SvgXml xml={ArrowLeft}/>

                </TouchableOpacity>
                <Text style={styles.headerTitle}>Konum Seçiniz</Text>
              </View>
              <Center>

                <Box maxW="350" w="100%">
                  <Select
                      selectedValue={selectedCountry}
                      minWidth="200"
                      accessibilityLabel="Choose Country"
                      placeholder="Choose Country"
                      style={{color: 'white',fontFamily: 'Alegreya-Bold'}}
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(itemValue) => handleCountryChange(itemValue)}
                  >
                    {countries.map((country:any) => (
                        <Select.Item
                            style={{color: 'white',fontFamily: 'Alegreya-Bold'}}
                            key={country.UlkeID}
                            label={country.UlkeAdi}
                            value={country.UlkeID}
                        />
                    ))}
                  </Select>
                </Box>
                <Box maxW="350" w="100%" mt={3}>
                  <Select
                      selectedValue={selectedCity}
                      minWidth="200"
                      style={{color: 'white',fontFamily: 'Alegreya-Bold'}}
                      accessibilityLabel="Choose City"
                      placeholder="Choose City"
                      isDisabled={!selectedCountry}
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(itemValue) => handleCityChange(itemValue)}
                  >
                    {cities.map((city:any) => (
                        <Select.Item
                            key={city.SehirID}
                            label={city.SehirAdi}
                            value={city.SehirID}
                        />
                    ))}
                  </Select>
                </Box>
                <Box maxW="350" w="100%" mt={3}>
                  <Select
                      selectedValue={selectedDistrict}
                      minWidth="200"
                      style={{color: 'white',fontFamily: 'Alegreya-Bold'}}
                      accessibilityLabel="Choose District"
                      placeholder="Choose District"
                      isDisabled={!selectedCity}
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(itemValue) => handleDistrictChange(itemValue)}
                  >
                    {districts.map((district:any) => (
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
                    isDisabled={!selectedDistrict}
                >
                  Fetch Prayer Times
                </Button>
              </Center>
            </>

        )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    width: '100%',
    backgroundColor: '#1c1c1c',

  },
  errorText: {
    color: 'red',
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom:20,
    justifyContent: 'space-between',
    width: '65%'

  },
    headerTitle: {
    fontSize: 18,
      fontFamily: 'Alegreya-Bold',
      color: 'white',


    },
});

export default SettingsPage;
