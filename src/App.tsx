import {NativeBaseProvider} from 'native-base';
import AppRoutes from './routes/AppRoutes';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppInitializer from './AppInitializer';

const App: React.FC = () => {
  return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NativeBaseProvider>
              <NavigationContainer>
                <AppInitializer>
                  <AppRoutes />
                </AppInitializer>
              </NavigationContainer>
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      </>

  );
};

export default App;
