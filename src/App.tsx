import {NativeBaseProvider} from 'native-base';
import AppRoutes from './routes/AppRoutes';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
