import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';
import AuthContext from '../navigation/AuthContext';

const imgFormularioDeRegistro = require('../assets/img/formulario-de-registro.png');
const imgForma = require('../assets/img/forma.png');

const UserPanel = () => {
  const [loading, setLoading] = useState(false);
  const [programas, setProgramas] = useState([]);
  const [avaliacaoRealizada, setAvaliacaoRealizada] = useState({});
  const [instituicaoNome, setInstituicaoNome] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const { userData } = useContext(AuthContext);

  const fetchData = async () => {
    const instituicao = await AsyncStorage.getItem('instituicaoNome');
    const user = await AsyncStorage.getItem('username');
    const userGender = await AsyncStorage.getItem('gender');
    
    const dateObj = new Date(await AsyncStorage.getItem('birthDate'));
    
    const birthDate = dateObj.toLocaleDateString('pt-BR');
    const cpfRaw = await AsyncStorage.getItem('cpf');
    const cpfFormatted = cpfRaw ? cpfRaw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';

    setLoading(true);
    Promise.all([
      axios.get(`https://weak-lamb-shift.cyclic.app/programas?instituicaoNome=${instituicao}`),
      axios.get(`https://weak-lamb-shift.cyclic.app/checkAvaliacao?cpf=${cpfRaw}&instituicaoNome=${instituicao}`)
    ])
    .then(([programasResponse, avaliacaoResponse]) => {
      setProgramas(programasResponse.data.map(programa => {
        const linkForm = `${programa.link_form}?nome=${user}&instituicao=${instituicao}&data=${birthDate}&cpf=${cpfFormatted}`;
        return { ...programa, linkForm };
      }));

      if (avaliacaoResponse.data.avaliacaoRealizada === 1) {
        const newAvaliacaoState = {};
        programasResponse.data.forEach(programa => {
          newAvaliacaoState[programa.id] = true;
        });
        setAvaliacaoRealizada(newAvaliacaoState);
      }
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userData) {
      const fetchData = async () => {
        const { username, institution, gender, birthDate, cpf } = userData;
        
        setUsername(username);
        setInstituicaoNome(institution);
        setGender(gender);
  
        const dateObj = new Date(birthDate);
        const birthDateFormatted = dateObj.toLocaleDateString('pt-BR');
        const cpfFormatted = cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
  
        setLoading(true);
        try {
          const [programasResponse, avaliacaoResponse] = await Promise.all([
            axios.get(`https://weak-lamb-shift.cyclic.app/programas?instituicaoNome=${institution}`),
            axios.get(`https://weak-lamb-shift.cyclic.app/checkAvaliacao?cpf=${cpf}&instituicaoNome=${institution}`)
          ]);
  
          setProgramas(programasResponse.data.map(programa => {
            const linkForm = `${programa.link_form}?nome=${username}&instituicao=${institution}&data=${birthDateFormatted}&cpf=${cpfFormatted}`;
            return { ...programa, linkForm };
          }));
  
          if (avaliacaoResponse.data.avaliacaoRealizada === 1) {
            const newAvaliacaoState = {};
            programasResponse.data.forEach(programa => {
              newAvaliacaoState[programa.id] = true;
            });
            setAvaliacaoRealizada(newAvaliacaoState);
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }
  }, [userData]);
  
  
  const greeting = gender === 'male' ? 'Seja Bem Vindo, ' : 'Seja Bem Vinda, ';

  const handlePress = (linkForm) => {
    Linking.openURL(linkForm);
  };

  return (
    <AdminLayout>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles.title}>{greeting} {username}</Text>
            <FlatList
              data={programas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.card} 
                  onPress={() => handlePress(item.linkForm)}
                  disabled={avaliacaoRealizada[item.id]}
                >
                  <View style={styles.cardContent}>
                    <Image source={avaliacaoRealizada[item.id] ? imgFormularioDeRegistro : imgForma} style={styles.cardIcon} />
                    <View style={styles.cardText}>
                      <Text style={styles.cardTitle}>{item.nome_programa}</Text>
                      <Text style={styles.cardBody}>
                        {avaliacaoRealizada[item.id] ? 'Avaliação REALIZADA' : 'Avaliação Disponível'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </View>
    </AdminLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardBody: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default UserPanel;
