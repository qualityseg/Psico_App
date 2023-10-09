import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminNavbar from '../components/Navbar/AdminNavbar.js';
import AdminSidebar from '../components/Sidebar/AdminSidebar.js'; // Importe o novo componente

const Tab = createBottomTabNavigator();

const Admin = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <View style={styles.adminContainer}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        {/* Outras rotas aqui */}
      </Tab.Navigator>
      {/* Seu componente Footer aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  adminContainer: {
    flex: 1,
  },
  // ...outros estilos
});

export default Admin;
