import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Admin from '../layouts/Admin';
import UserPanel from '../screens/UserPanel';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="UserPanel">
      <Tab.Screen name="UserPanel" component={UserPanel} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
