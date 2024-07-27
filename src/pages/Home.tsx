import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
// @ts-ignore
import AsrBg from '../assets/backgrounds/Fajr.png';
// @ts-ignore
import {SvgXml} from 'react-native-svg';

import {Shubuh} from '../assets/icons/Shubuh';
import {Dhuha} from '../assets/icons/Dhuha';
import {Zhuhur} from '../assets/icons/Zhuhur';
import {Ashar} from '../assets/icons/Ashar';
import {Maghrib} from '../assets/icons/Maghrib';
import {Isya} from '../assets/icons/Isya';

const {width: screenWidth} = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgAsrContainer}>
        <Image source={AsrBg} style={styles.imageBgStyling} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.remainingTimeView}>
          <Text style={styles.remainingTimeTitle}>Akşam Namazına Kalan</Text>
          <Text style={styles.remainingTime}>02:55:00</Text>
        </View>
        <View style={styles.currentDateView}>
          <Text style={styles.currentDateTxtTr}>16 Temmuz 2023</Text>
          <Text style={styles.currentDateMiladi}>16 Temmuz 2023</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewStyling}>
          <View style={styles.timeView}>
            <View style={styles.timeIconView}>
              <View style={styles.flexView}>
                <View>
                  <SvgXml xml={Shubuh} />
                </View>
                <Text style={styles.timeTxt}>İmsak</Text>
              </View>
              <Text style={styles.timeTxt}>06:34</Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <View style={styles.timeIconView}>
              <View style={styles.flexView}>
                <View>
                  <SvgXml xml={Dhuha} />
                </View>
                <Text style={styles.timeTxt}>Güneş</Text>
              </View>
              <Text style={styles.timeTxt}>06:34</Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <View style={styles.timeIconView}>
              <View style={styles.flexView}>
                <View>
                  <SvgXml xml={Zhuhur} />
                </View>
                <Text style={styles.timeTxt}>Ögle</Text>
              </View>
              <Text style={styles.timeTxt}>06:34</Text>
            </View>
          </View>
          <View style={styles.timeViewNext}>
            <View style={styles.timeIconView}>
              <View style={styles.flexView}>
                <View>
                  <SvgXml xml={Ashar} />
                </View>
                <Text style={styles.timeTxt}>İkindi</Text>
              </View>
              <Text style={styles.timeTxt}>06:34</Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <View style={styles.timeIconView}>
              <View style={styles.flexView}>
                <View>
                  <SvgXml xml={Maghrib} />
                </View>
                <Text style={styles.timeTxt}>Akşam</Text>
              </View>
              <Text style={styles.timeTxt}>06:34</Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <View style={styles.timeIconView}>
              <View style={styles.flexView}>
                <View>
                  <SvgXml xml={Isya} />
                </View>
                <Text style={styles.timeTxt}>Yatsı</Text>
              </View>
              <Text style={styles.timeTxt}>06:34</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
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
    backgroundColor: '#32CD32',
    borderRadius: 15,
    width: screenWidth * 0.9,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
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
});

export default Home;
