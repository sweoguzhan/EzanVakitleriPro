import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home.tsx';
import Compass from '../pages/CompassScreen.tsx';
import Settings from '../pages/Settings.tsx';
import MonthlyPrayTimes from '../pages/30DaysPrayTimes.tsx';
import React from 'react';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainPageStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MonthlyPrayTimes" component={MonthlyPrayTimes} />
      <Stack.Screen name="Compass" component={Compass} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
