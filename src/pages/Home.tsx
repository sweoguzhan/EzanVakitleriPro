import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Dimensions, TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
// @ts-ignore
import FajrBg from '../assets/backgrounds/Fajr.png';
// @ts-ignore
import ShurukBg from '../assets/backgrounds/Shuruk.png';
// @ts-ignore
import DhuhrBg from '../assets/backgrounds/Dhuhr.png';
// @ts-ignore
import AsrBg from '../assets/backgrounds/Asr.png';
// @ts-ignore
import MaghribBg from '../assets/backgrounds/Maghrib.png';
// @ts-ignore
import IshaBg from '../assets/backgrounds/Isha.png';
// @ts-ignore

import {Shubuh} from '../assets/icons/Shubuh';
import {Dhuha} from '../assets/icons/Dhuha';
import {Zhuhur} from '../assets/icons/Zhuhur';
import {Ashar} from '../assets/icons/Ashar';
import {Maghrib} from '../assets/icons/Maghrib';
import {Isya} from '../assets/icons/Isya';

import {ActivityIndicator} from "react-native";

const {width: screenWidth} = Dimensions.get('window');

const getNextPrayerTime = (currentTime: any, prayerTimes: any) => {
  if (!prayerTimes) {
    return null;
  }

  const times = ['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi'];
  for (let i = 0; i < times.length; i++) {
    const time = prayerTimes[times[i]];
    if (!time) {
      continue;
    }

    const [hour, minute] = time.split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0, 0);
    if (prayerTime > currentTime) {
      return {name: times[i], time: prayerTime};
    }
  }
  return null;
};

const Home = ({navigation}) => {
  const {prayerTimes, countryName, cityName, districtName} = useSelector(state => state.prayerTimes);

  const [remainingTime, setRemainingTime] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [currentPrayerTimes, setCurrentPrayerTimes] = useState(null);

  const getCurrentPrayerTimes = prayerTimes => {
    const currentDate = new Date().toISOString().split('T')[0];

    const formattedDate = currentDate.split('-').reverse().join('.');

    console.log('currentDate', formattedDate);
    const currentDay = prayerTimes.find(
      day => day.MiladiTarihKisa === formattedDate,
    );
    return currentDay;
  };

  const getBackgroundImage = nextPrayer => {
    switch (nextPrayer) {
      case 'Imsak':
        return FajrBg;
      case 'Gunes':
        return ShurukBg;
      case 'Ogle':
        return DhuhrBg;
      case 'Ikindi':
        return AsrBg;
      case 'Aksam':
        return MaghribBg;
      case 'Yatsi':
        return IshaBg;
      default:
        return FajrBg;
    }
  };
  useEffect(() => {
    if (prayerTimes.length > 0) {
      const todayPrayerTimes = getCurrentPrayerTimes(prayerTimes);
      setCurrentPrayerTimes(todayPrayerTimes);
    }

  }, [prayerTimes]);

  const goToSettingsPage = () => {
    navigation.navigate('Settings');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const next = getNextPrayerTime(currentTime, currentPrayerTimes);
      if (next) {
        const timeDiff = next.time - currentTime;
        setRemainingTime(new Date(timeDiff).toISOString().substr(11, 8));
        setNextPrayer(next.name);
      } else {
        setRemainingTime(null);
        setNextPrayer(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPrayerTimes]);
  if (!prayerTimes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Namaz vakitleri bulunamadı.</Text>
      </View>
    );
  }

  const backgroundImage = getBackgroundImage(nextPrayer);

  const renderTimeView = (name: any, time: any, icon: any) => (
    <View style={nextPrayer === name ? styles.timeViewNext : styles.timeView}>
      <View style={styles.timeIconView}>
        <View style={styles.flexView}>
          <SvgXml xml={icon} />
          <Text style={styles.timeTxt}>{name}</Text>
        </View>
        <Text style={styles.timeTxt}>{time}</Text>
      </View>
    </View>
  );

  return (
      <>
        {prayerTimes.length ? (
            <View style={styles.container}>
              <View style={styles.bgAsrContainer}>
                <Image source={backgroundImage} style={styles.imageBgStyling} />
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.remainingTimeView}>
                  <Text style={styles.remainingTimeTitle}>
                    {nextPrayer ? `${nextPrayer} Vaktine Kalan` : 'Namaz vakti geçti'}
                  </Text>
                  <Text style={styles.remainingTime}>{remainingTime}</Text>
                </View>
                <View style={styles.currentDateView}>
                  <Text style={styles.currentDateTxtTr}>
                    {prayerTimes[0].MiladiTarihUzun}
                  </Text>
                  <Text style={styles.currentDateMiladi}>
                    {prayerTimes[0].HicriTarihUzun}
                  </Text>
                </View>
                <TouchableOpacity onPress={goToSettingsPage}>
                  <Text style={styles.locationTxt}>
                    {cityName} - {districtName}
                  </Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.scrollViewStyling}>
                  {renderTimeView('Imsak', prayerTimes[0].Imsak, Shubuh)}
                  {renderTimeView('Gunes', prayerTimes[0].Gunes, Dhuha)}
                  {renderTimeView('Ogle', prayerTimes[0].Ogle, Zhuhur)}
                  {renderTimeView('Ikindi', prayerTimes[0].Ikindi, Ashar)}
                  {renderTimeView('Aksam', prayerTimes[0].Aksam, Maghrib)}
                  {renderTimeView('Yatsi', prayerTimes[0].Yatsi, Isya)}
                </ScrollView>
              </View>
            </View>
        ) : (
            <ActivityIndicator size="large" color="#0000ff" />
        )}
      </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  bgAsrContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  imageBgStyling: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
    zIndex: 1,
    width: '100%',
  },
  scrollViewStyling: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: screenWidth * 0.9,
  },
  timeView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: screenWidth * 0.9,
    alignItems: 'center',
  },
  timeViewNext: {
    backgroundColor: '#12a895',
    borderRadius: 15,
    width: screenWidth * 0.9,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1,
  },
  timeTxt: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Alegreya-bold',
  },
  timeIconView: {
    flexDirection: 'row',
    width: '100%',
    padding: 8,
  },
  flexView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  remainingTimeView: {
    alignItems: 'center',
  },
  remainingTimeTitle: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Alegreya-bold',
  },
  remainingTime: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Alegreya-bold',
  },
  currentDateView: {
    alignItems: 'center',
    marginTop: 10,
  },
  currentDateTxtTr: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Alegreya-bold',
  },
  currentDateMiladi: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Alegreya-bold',
  },
  locationTxt:{
    color: 'white',
    fontSize: 18,
    fontFamily: 'Alegreya-bold',
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
  },
});

export default Home;
