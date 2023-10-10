import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated} from 'react-native';
import { useNavigation , CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../navigation/AuthContext';

const AdminNavbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext); 
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(animationValue, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogout = async () => {
    await logout();
    
    // Resetar o estado da navegação e navegar para 'MainTabNavigator'
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'AuthStack', params: { screen: 'Login' } }],
    });
  
    navigation.dispatch(resetAction);
  };

  const menuHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],  // Altura do menu dobrada
  });

  return (
    <View>
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
          <Icon name="bars" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={require('../../assets/img/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.menuContainer, { height: menuHeight }]}>
        {menuVisible && (
          <>
            <TouchableOpacity onPress={() => {/* navegar para o Painel do Paciente */}}>
              <Text style={styles.menuText}>Painel de Paciente</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#ADD16A',
    paddingHorizontal: 15,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ADD16A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
  menuContainer: {
    backgroundColor: '#587C15',
    paddingHorizontal: 25,
    overflow: 'hidden',
  },
  menuText: {
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
});

export default AdminNavbar;
