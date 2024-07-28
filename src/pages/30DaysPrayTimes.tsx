import React, {useEffect} from 'react';
import {Text} from 'native-base';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ArrowLeft} from '../assets/icons/ArrowLeft';
import {useSelector} from 'react-redux';

const MonthlyPrayTimes = () => {
  const {prayerTimes} = useSelector(state => state.prayerTimes);
  const todayDateIso8061 = new Date().toISOString().split('T')[0];
    const todayDate = todayDateIso8061.split('-').reverse().join('.');
    return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerFixed}>
        <View style={styles.headerView}>
          <TouchableOpacity>
            <SvgXml xml={ArrowLeft} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>İmsakiye</Text>
        </View>
      </View>
      <ScrollView>
        {prayerTimes.map((day: any, index: any) => (
          <View key={index} style={styles.scollableViewItem}>
            <View style={todayDate === day.MiladiTarihKisa ? styles.mainViewToday : styles.mainView}>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>{day.MiladiTarihUzun}</Text>
                <Text style={styles.dateTxt}>{day.HicriTarihUzun}</Text>
              </View>
              <View style={styles.vakitView}>
                <Text style={styles.vakitTxt}>İmsak</Text>
                <Text style={styles.timeTxt}>{day.Imsak}</Text>
              </View>
              <View style={styles.vakitView}>
                <Text style={styles.vakitTxt}>Güneş</Text>
                <Text style={styles.timeTxt}>{day.Gunes}</Text>
              </View>
              <View style={styles.vakitView}>
                <Text style={styles.vakitTxt}>Öğle</Text>
                <Text style={styles.timeTxt}>{day.Ogle}</Text>
              </View>
              <View style={styles.vakitView}>
                <Text style={styles.vakitTxt}>İkindi</Text>
                <Text style={styles.timeTxt}>{day.Ikindi}</Text>
              </View>
              <View style={styles.vakitView}>
                <Text style={styles.vakitTxt}>Akşam</Text>
                <Text style={styles.timeTxt}>{day.Aksam}</Text>
              </View>
              <View style={styles.vakitView}>
                <Text style={styles.vakitTxt}>Yatsı</Text>
                <Text style={styles.timeTxt}>{day.Yatsi}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  headerFixed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1c1c1c',
  },
  headerTxt: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Alegreya-Black',
  },
  headerView: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scollableViewItem: {
    padding: 10,
  },
  timeTxt: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Alegreya-Black',
  },
  vakitTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Alegreya-Black',
  },
  flexView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 10,
    backgroundColor: '#363636',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  mainViewToday: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 10,
    backgroundColor: '#404040',
  },
  vakitView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
    width: '16.6%',
  },
  dateView: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  dateTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Alegreya-Black',
  },
});

export default MonthlyPrayTimes;
