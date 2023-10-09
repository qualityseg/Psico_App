
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, ScrollView,  CommonActions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthContext from '../navigation/AuthContext';

const UserLogin = () => {
  const navigation = useNavigation();
  const { setAuthentication } = useContext(AuthContext); // Use o contexto aqui

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleFirstAccess = () => {
    navigation.navigate('PrimeiroAcesso');
  };

  useEffect(() => {
    // Handle background image here, if needed
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://weak-lamb-shift.cyclic.app/api/user/login", {
        Email: email,
        senha: senha,
      });

      if (response.data.success) {
        console.log(navigation);
        navigation.navigate('MainTabNavigator', { screen: 'UserPanel' });

        setAuthentication(true);  // Agora setAuthentication está disponível
        
      
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('instituicaoNome', response.data.institution);
        await AsyncStorage.setItem('role', response.data.role);
        await AsyncStorage.setItem('birthDate', response.data.birthDate);
        await AsyncStorage.setItem('cpf', response.data.cpf);
        await AsyncStorage.setItem('gender', response.data.gender); // Adicione esta linha
        // Log do AsyncStorage após login bem-sucedido
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          console.log('Dados do AsyncStorage após o login:', stores);
        });
      });
        // Set a timeout to expire tokens
        setTimeout(() => {
          AsyncStorage.multiRemove(['token', 'username', 'instituicaoNome', 'role', 'birthDate', 'cpf']);
        }, 3600000); // 1 hour
        
      } else {
        Alert.alert("Falha", "Credenciais Incorretas!");
      }
    } catch (error) {
      Alert.alert("Erro", "Algo deu errado!");
      console.error(error);
    }
    

  };

  return (
    <ImageBackground source={{uri: 'https://imgur.com/CrlSHBe.png'}} style={styles.backgroundImage}>
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
    alignItems: 'center', // Centraliza os elementos na coluna
  },
  logo: {
    width: '90%', // Ajustando o tamanho do logo para se encaixar na coluna
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain', // Faz com que a imagem seja redimensionada para se ajustar ao container
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