import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home.tsx';
import Compass from '../pages/CompassScreen.tsx';
import Settings from '../pages/Settings.tsx';
import MonthlyPrayTimes from '../pages/30DaysPrayTimes.tsx';
import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TabBar from "../components/BottomTab.tsx";
import QiblaScreen from "../pages/CompassScreen.tsx";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const MainTabs = () => {
    return (
        <Tab.Navigator
            tabBar={props => {
                return <TabBar {...props} />;
            }}
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="MonthlyPrayTimes" component={MonthlyPrayTimes} />
            <Tab.Screen name="QiblaScreen" component={Compass} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};


const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainPageStack"
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
