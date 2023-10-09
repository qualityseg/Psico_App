import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PrimeiroAcesso = () => {
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyUser = async () => {
    try {
      const response = await axios.post('https://weak-lamb-shift.cyclic.app/api/verifyUser', { Email });
      if (response.data.success) {
        setVerified(true);
      } else {
        setError('Identificador incorreto.');
      }
    } catch (error) {
      setError('Erro ao verificar usuário');
    }
  };

  const registerPassword = async () => {
    try {
      const response = await axios.post('https://weak-lamb-shift.cyclic.app/api/registerPassword', { Email, Senha });
      if (response.data.success) {
        navigation.popToTop();
      } else {
        setError('Erro ao cadastrar senha');
      }
    } catch (error) {
      setError('Erro ao cadastrar senha');
    }
  };

  return (
    
    <ImageBackground source={{ uri: 'https://imgur.com/CrlSHBe.png' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.contentColumn}>
        <Text style={styles.title}>{!verified ? 'Primeiro Acesso' : 'Cadastro de Senha'}</Text>
        {!verified ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={Email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={verifyUser}>
              <Text style={styles.buttonText}>Verificar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={Senha}
              onChangeText={(text) => setSenha(text)}
            />
            <TouchableOpacity style={styles.button} onPress={registerPassword}>
              <Text style={styles.buttonText}>Cadastrar senha</Text>
            </TouchableOpacity>
          </>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch'
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
  title: {
    fontSize: 24,
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default PrimeiroAcesso;
