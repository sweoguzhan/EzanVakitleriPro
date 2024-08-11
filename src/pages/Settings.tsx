import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
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
import PushNotification from 'react-native-push-notification';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    countries,
    cities,
    districts,
    loading,
    error,
    city,
    country,
    district,
    prayerTimes,
  } = useSelector(state => state.prayerTimes);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    dispatch(fetchCountries());
    if (country && city && district) {
      setSelectedCountry(country);
      setSelectedCity(city);
      setSelectedDistrict(district);
    }

    console.log('new Date().toLocaleDateString().split(\'.\').reverse().join(\'-\')' + new Date().toLocaleDateString('tr-TR', dateOptions));
  }, [dispatch]);

  const handleCountryChange = countryId => {
    setSelectedCountry(countryId);
    setSelectedCity('');
    setSelectedDistrict('');
    dispatch(SelectedCountry(countryId));
    dispatch(fetchCities(countryId));
  };

  const handleCityChange = cityId => {
    setSelectedCity(cityId);
    setSelectedDistrict('');
    dispatch(SelectedCity(cityId));
    dispatch(fetchDistricts(cityId));
  };

  const handleDistrictChange = districtId => {
    setSelectedDistrict(districtId);
    dispatch(SelectedDistrict(districtId));
  };

  const handleFetchPrayerTimes = () => {
    if (selectedDistrict) {
      dispatch(fetchPrayerTimes(selectedDistrict)).then(action => {
        if (action.type === 'prayerTimes/fetchPrayerTimes/fulfilled') {
          scheduleNotifications(action.payload);
          navigation.navigate('Home');
        }
      });
    }
  };
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

  const scheduleNotifications = (prayerTimes) => {
    prayerTimes.forEach(dayPrayerTimes => {
      const formattedDate = dayPrayerTimes.MiladiTarihKisa;

      console.log('formattedDate', formattedDate);

      const prayerNames = ['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi'];
      prayerNames.forEach(prayer => {
        const [day, month, year] = formattedDate.split('.');
        const prayerTime = new Date(`${year}-${month}-${day}T${dayPrayerTimes[prayer]}:00`);
        const notificationTime = new Date(prayerTime.getTime() - 19 * 60000); // 20 dakika öncesi

        console.log('prayerTime', prayerTime);
        console.log('notificationTime', notificationTime);

        PushNotification.localNotificationSchedule({
          channelId: 'prayer-time-channel',
          message: `${prayer} vaktine 20 dakika kaldı`,
          date: notificationTime,
        });

        PushNotification.localNotificationSchedule({
          channelId: 'prayer-time-channel',
          message: `${prayer} vakti geldi`,
          date: prayerTime,
        });
      });
    });
  };
  const screenHeight = Dimensions.get('window').height;

  return (
      <SafeAreaView style={styles.container}>
        {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && (
            <>
              <View style={styles.headerView}>
                <Text style={styles.headerTitle}>Konum Seçiniz</Text>
              </View>
              <Center style={{ height: screenHeight - 200, justifyContent: 'space-between' }}>
                <Center style={{ width: '100%' }}>
                  <Box maxW="350" w="100%">
                    <Select
                        selectedValue={selectedCountry}
                        minWidth="200"
                        accessibilityLabel="Choose Country"
                        placeholder="Choose Country"
                        style={styles.select}
                        _selectedItem={{
                          bg: 'teal.600',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue => handleCountryChange(itemValue)}>
                      {countries.map(country => (
                          <Select.Item
                              style={styles.selectItem}
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
                        style={styles.select}
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
                  <Box maxW="350" w="100%" mt={3}>
                    <Select
                        selectedValue={selectedDistrict}
                        minWidth="200"
                        style={styles.select}
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
                </Center>
                <Button
                    style={styles.saveButton}
                    onPress={handleFetchPrayerTimes}
                    disabled={!selectedDistrict}
                >
                  <Text style={{ color: 'white', fontFamily: 'Alegreya-Bold', fontSize: 16 }}>Kaydet</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 20,
    justifyContent: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Alegreya-Bold',
    color: 'white',
  },
  select: {
    color: 'white',
    fontFamily: 'Alegreya-Bold',
  },
  selectItem: {
    color: 'white',
    fontFamily: 'Alegreya-Bold',
  },
  saveButton: {
    marginTop: 20,
    width: '90%',
    backgroundColor: 'teal',
    color: 'white',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default SettingsPage;
