import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AuthNavigator from './src/navigations/AuthNavigator';
import {store} from './src/reduxes/store';

const App: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
