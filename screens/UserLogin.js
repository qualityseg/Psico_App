import React, { useState, useEffect, useRef, useContext } from 'react';
import { Animated, Image, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthContext from '../navigation/AuthContext';

const UserLogin = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { setAuthentication, setToken, setUserData } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleFirstAccess = () => {
    navigation.navigate('PrimeiroAcesso');
  };

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        console.log('Dados do AsyncStorage no UserLogin:', stores);
      });
    });
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://weak-lamb-shift.cyclic.app/api/user/login", {
        Email: email,
        senha: senha,
      });

      if (response.data.success) {
        setAuthentication(true);
        setToken(response.data.token);
        setUserData({
          username: response.data.username,
          institution: response.data.institution,
          role: response.data.role,
          birthDate: response.data.birthDate,
          cpf: response.data.cpf,
          gender: response.data.gender
        });

        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('institution', response.data.institution);
        await AsyncStorage.setItem('role', response.data.role);
        await AsyncStorage.setItem('birthDate', response.data.birthDate);
        await AsyncStorage.setItem('cpf', response.data.cpf);
        await AsyncStorage.setItem('gender', response.data.gender);

        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabNavigator', params: { screen: 'UserPanel' } }],
        });

        navigation.dispatch(resetAction);
      } else {
        Alert.alert("Falha", "Credenciais Incorretas!");
      }
    } catch (error) {
      Alert.alert("Erro", "Algo deu errado!");
      console.error(error);
    }
  };

  return (
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      <ImageBackground source={require('../assets/img/background.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.contentColumn}>
            <Image source={{uri: 'https://imgur.com/qwGDNx6.png'}} style={styles.logo} />
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Logar</Text>
            </TouchableOpacity>
            <Text style={styles.clickableText} onPress={handleFirstAccess}>Primeiro acesso</Text>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColumn: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#85BB32',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  clickableText: {
    marginTop: 20,
    color: '#85BB32',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UserLogin;
