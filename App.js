import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext, { AuthProvider } from './navigation/AuthContext';
import AuthStack from './navigation/AuthStack';
import MainTabNavigator from './navigation/MainTabNavigator';

const RootStack = createStackNavigator();

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName={isAuthenticated ? "MainTabNavigator" : "AuthStack"}>
          <RootStack.Screen 
            name="MainTabNavigator" 
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen 
            name="AuthStack" 
            component={AuthStack} 
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;