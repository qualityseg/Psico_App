import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminNavbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);

    Animated.timing(animationValue, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogout = async () => {
    console.log("handleLogout chamado");
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);

      // Debug: Verifique se o token foi realmente removido
      const testToken = await AsyncStorage.getItem('token');
      console.log("Test token after removal: ", testToken);  // Deve ser null
      // Imprimir os valores armazenados no AsyncStorage
      setAuthentication(false);
      setUserData(null);  // Limpa os dados do usuário
      navigation.navigate('Login');
      // Log do AsyncStorage após logout
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          console.log('Dados do AsyncStorage após o logout:', stores);
        });
      });
      
    } catch (e) {
      console.error(e);
    }
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
