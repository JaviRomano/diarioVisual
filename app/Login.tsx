
import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import Footer from './Footer';

type RootStackParamList = {
  Login: undefined;
  Publicaciones: undefined;
  Registro: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const irARegistro = () => {
    navigation.navigate('Registro');
  };

  const pulsaParaLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost/api-diario-visual/api-react/login.php', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        setError('');
        navigation.navigate('Publicaciones');
      } else {
        setError(response.data.message || 'Credenciales incorrectas');
      }
    } catch (err: any) {
      console.error("Error en la petición:", err);
      const errorMessage =
        err.response?.data?.message || 'Error al conectar con el servidor. Inténtelo más tarde.';
      setError(errorMessage);
    }
  };
 
  return (
    <View style={tw`flex-1 justify-center bg-black `}>
      <Image source={require('../assets/images/logo.png')} style={tw`h-40 w-40 self-center mb-8 rounded-lg border border-blue-900`} />
      
      <View style={tw`space-y-4 p-6`}>
        <TextInput
          style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg mb-4`}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg`}
          placeholder="Pass"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={{backgroundColor: '#1E3A8A', paddingVertical: 12, borderRadius: 20, marginTop: 16}}
          onPress={pulsaParaLogin}
        >
          <Text style={tw`text-white text-xl font-bold text-center`}>Acceder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{backgroundColor: '#1E3A8A', paddingVertical: 12, borderRadius: 20, marginTop: 16}}
          onPress={irARegistro}
        >
          <Text style={tw`text-white text-xl font-bold text-center`}>Crear Cuenta</Text>
        </TouchableOpacity>

        {error && <Text style={tw`text-red-500 text-center mt-3`}>{error}</Text>}
      </View>
      <Footer/>
    </View>
  );
};

export default Login;