import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Header from './Header';
import { Ionicons } from '@expo/vector-icons';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost/api-diario-visual/registro.php', {
        name,
        email,
        password,
      });

      if (response.data.status === 'success') {
        setSuccess('Registro exitoso');
        setError('');
      } else {
        setError(response.data.message || 'No se pudo completar el registro.');
        setSuccess('');
      }
    } catch (err: any) {
      setError('Error al registrar: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <Header title="Nueva cuenta" />
      <TouchableOpacity
        style={tw`absolute top-3.5 left-4`}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <View style={tw`justify-center flex-1`}>
        <Image source={require('../assets/images/logo.png')} style={tw`h-40 w-40 self-center mb-8 rounded-lg border border-blue-900`} />

        <View style={tw`space-y-4 p-6`}>
          <TextInput
            style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg text-white mb-4`}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg text-white mb-4`}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg text-white mb-4`}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={tw`h-10 px-4 rounded-xl border border-blue-900 bg-gray-500 text-lg text-white mb-4`}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />


          <TouchableOpacity
            style={{ backgroundColor: '#1E3A8A', paddingVertical: 12, borderRadius: 20, marginTop: 16 }}
            onPress={handleRegister}
          >
            <Text style={tw`text-white text-xl font-bold text-center`}>Registrarse</Text>
          </TouchableOpacity>

          {error && <Text style={tw`text-red-500 text-center mt-3`}>{error}</Text>}
          {success && <Text style={tw`text-green-500 text-center mt-3`}>{success}</Text>}
        </View>
      </View>

    </View>
  );
};

export default Register;