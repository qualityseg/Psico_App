import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Copyright © 2023 LifeMed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  footerText: {
    color: '#333',
  },
});

export default Footer;
