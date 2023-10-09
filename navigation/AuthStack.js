import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserLogin from '../screens/UserLogin';
import PrimeiroAcesso from '../screens/PrimeiroAcesso';
const Stack = createStackNavigator();

const AuthStack = ({setAuthentication}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={UserLogin}  initialParams={{ setAuthentication: setAuthentication }}/>
      <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcesso} />
    </Stack.Navigator>
  );
};

export default AuthStack;
