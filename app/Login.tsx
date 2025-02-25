import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/config'; // ✅ Importa config correctamente
import Header from './Header';
import Footer from './Footer';

// ✅ Define correctamente el tipo de navegación
type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  Publicaciones: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProps>(); // ✅ Agrega tipado correcto

  const irARegistro = () => {
    navigation.navigate('Registro');
  };

  const pulsaParaLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      // 🔥 Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      navigation.navigate('Publicaciones'); // ✅ Redirige a publicaciones
    } catch (err: any) {
      // 🔴 Manejo de errores de Firebase Auth
      switch (err.code) {
        case 'auth/invalid-email':
          setError('El correo no es válido');
          break;
        case 'auth/user-not-found':
          setError('Usuario no encontrado');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta');
          break;
        default:
          setError('Error al iniciar sesión');
      }
    }
  };

  return (
    <View style={tw`flex-1 bg-black `}>
      <Header title="Iniciar sesión" />

      <View style={tw`justify-center flex-1`}>
        <Image source={require('../assets/images/logo.png')} style={tw`h-40 w-40 self-center mb-8 rounded-lg`} />

        <View style={tw`space-y-4 p-6`}>
          <TextInput
            style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg mb-4 text-white`}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg text-white`}
            placeholder="Contraseña"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={tw`bg-blue-900 py-3 rounded-xl mt-4`}
            onPress={pulsaParaLogin}
          >
            <Text style={tw`text-white text-xl font-bold text-center`}>Acceder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-gray-700 py-3 rounded-xl mt-4`}
            onPress={irARegistro}
          >
            <Text style={tw`text-white text-xl font-bold text-center`}>Crear Cuenta</Text>
          </TouchableOpacity>

          {error && <Text style={tw`text-red-500 text-center mt-3`}>{error}</Text>}
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default Login;
