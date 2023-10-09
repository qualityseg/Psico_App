import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // você precisará instalar esta biblioteca

const AdminNavbar = () => {
  const [username, setUsername] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Substitua isso por AsyncStorage ou SecureStore em React Native
    const savedUsername = 'fetch from storage';
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Limpa todo o espaço do AsyncStorage
      navigation.navigate('UserLogin'); // Redireciona para a tela de login
    } catch (e) {
      console.error(e); // Em caso de erro durante a remoção
    }
  };

  return (
    <View>
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="bars" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Admin Panel</Text>
      </View>
      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => { /* navegar para o Painel do Paciente */ }}>
            <Text style={styles.menuText}>Painel de Paciente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 250,
    backgroundColor: '#333',
  },
  logo: {
    width: 50,
    height: 50,
  },
  sidebarItem: {
    padding: 15,
  },
  sidebarText: {
    color: '#fff',
  },
});

export default Sidebar;
