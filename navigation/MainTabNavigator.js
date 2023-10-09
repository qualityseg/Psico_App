import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Admin from '../layouts/Admin';
import UserPanel from '../screens/UserPanel'; // Importe o painel do usuário aqui

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ setAuthentication }) => {
  return (
    <Tab.Navigator initialRouteName="UserPanel">
      <Tab.Screen 
        name="Admin" 
        component={Admin}
        initialParams={{ setAuthentication: setAuthentication }}
      />
      <Tab.Screen name="UserPanel" component={UserPanel} />
    </Tab.Navigator>
  );
};


export default MainTabNavigator;
