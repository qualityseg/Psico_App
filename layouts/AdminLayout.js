import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdminNavbar from '../components/Navbar/AdminNavbar.js';
import Footer from '../components/Footer/Footer.js';
import AdminSidebar from '../components/Sidebar/AdminSidebar.js';


const AdminLayout = ({ children, setAuthentication}) => {
    const [sidebarVisible, setSidebarVisible] = React.useState(false);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  
  return (
    <View style={styles.container}>
      <AdminNavbar />
      <View style={styles.mainContent}>
        <AdminSidebar />
        <View style={styles.userPanel}>
          {children}
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  userPanel: {
    flex: 1,
  },
});

export default AdminLayout;
