import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext({
  isAuthenticated: false,
  setAuthentication: () => {},
  token: null,
  setToken: () => {},
  userData: null,
  setUserData: () => {},
  logout: () => {}, // Função de logout
});

export const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setAuthentication] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setAuthentication(true);
      }
    };
    checkToken();
  }, []);
  
  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'username', 'institution', 'role', 'birthDate', 'cpf', 'gender']);
    setAuthentication(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication, token, setToken, userData, setUserData, logout }}>
          {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
