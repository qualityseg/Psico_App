import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicione este import

const AdminSidebar = ({ isVisible, toggleSidebar, setAuthentication }) => {
  if (!isVisible) return null;

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Limpa todo o espaço do AsyncStorage
      setAuthentication(false);  // Atualizando o estado para não autenticado
    } catch (e) {
      console.error(e); // Em caso de erro durante a remoção
    }
  };

  return (
    <View style={styles.sidebarContainer}>
      {/* Você pode adicionar seu logo aqui */}
      <TouchableOpacity onPress={() => toggleSidebar()}>
        <Text style={styles.sidebarText}>Close</Text>
      </TouchableOpacity>
      {/* Botão de Logout */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.sidebarText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    width: '80%',
    height: '100%',
    backgroundColor: '#333',
    zIndex: 999,
  },
  sidebarText: {
    color: '#fff',
    padding: 15,
  },
  // ...outros estilos
});

export default AdminSidebar;
