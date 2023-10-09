import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './navigation/AuthContext';
import AuthStack from './navigation/AuthStack';
import MainTabNavigator from './navigation/MainTabNavigator';

const RootStack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setAuthentication] = useState(false);

  useEffect(() => {
    // Tente obter o token do armazenamento local para verificar se o usuário está autenticado
    const tryToGetToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthentication(true);
      }
    };

    tryToGetToken();
  }, []);

  return (
    <NavigationContainer>
      
      <RootStack.Navigator initialRouteName={isAuthenticated ? 'MainTabNavigator' : 'AuthStack'}>
        <RootStack.Screen 
          name="AuthStack" 
          component={AuthStack} 
          options={{ headerShown: false }} 
        />
        <RootStack.Screen 
          name="MainTabNavigator" 
          component={MainTabNavigator}
          options={{ headerShown: false }}
          // Removido: initialParams={{ setAuthentication: setAuthentication }} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
