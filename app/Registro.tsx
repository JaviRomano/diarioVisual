import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleRegister = async () => {
    try {
      // Verificar que todos los campos sean completados
      if (!name || !email || !password || !phone) {
        setError('Por favor complete todos los campos');
        return;
      }

      const response = await axios.post('http://localhost/api-diario-visual/registro.php', {
        name: name,
        email: email,
        password: password,
        phone: phone,
      });

      if (response.data.status === 'success') {
        setSuccess('Registro exitoso');
        setError('');
      } else {
        setError(response.data.message);
        setSuccess('');
      }
    } catch (err: any) {
      setError('Error al registrar: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Registrarse" onPress={handleRegister} color="#800080" />
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8', // Fondo suave
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 10, // Bordes redondeados
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold', // Texto en negrita
  },
  success: {
    color: 'green',
    marginTop: 10,
    fontWeight: 'bold', // Texto en negrita
  },
  titulo:{
    fontSize:25,
    color:'#800080',
    fontWeight:'bold',
  }
});

export default Register;