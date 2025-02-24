import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import tw from 'twrnc';
import Footer from './Footer';

const SubirPublicacion = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState('');
  const [errores, setErrores] = useState({ titulo: false, contenido: false, imagen: false });

  const validarCampos = () => {
    let erroresTemp = {
      titulo: !titulo.trim(),
      contenido: !contenido.trim(),
      imagen: !imagen.trim(),
    };
    setErrores(erroresTemp);
    return !erroresTemp.titulo && !erroresTemp.contenido && !erroresTemp.imagen;
  };

  const handleSubirPublicacion = async () => {
    if (!validarCampos()) {
      Alert.alert('Error', 'Revisa que hayas completado todos los campos.');
      return;
    }
    Alert.alert('Publicación subida', 'Subida completada con éxito.');
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 justify-center bg-black`}>
      
      <Image
        source={require('../assets/images/logo.png')}
        style={tw`h-20 w-20 self-center mb-8 rounded-lg border border-blue-900`}
      />

<View style={tw`space-y-4 p-6`}>
        <Text style={tw`text-white text-2xl font-bold text-center mb-4`}>
          Subir Nueva Publicación
        </Text>


        <TextInput
  style={tw`bg-gray-500 text-white p-2 rounded-lg mb-4 border-4 ${errores.titulo ? 'border-red-500' : 'border-blue-900 '}`}
  placeholder="Título"
  value={titulo}
  onChangeText={setTitulo}
  placeholderTextColor="#aaa"
/>

<TextInput
  style={tw`bg-gray-500 text-white p-2 rounded-lg mb-4 border-4 ${errores.contenido ? 'border-red-500' : 'border-blue-900'}`}
  placeholder="Contenido"
  value={contenido}
  onChangeText={setContenido}
  placeholderTextColor="#aaa"
/>

<TextInput
  style={tw`bg-gray-500 text-white p-2 rounded-lg mb-4 border-4 ${errores.imagen ? 'border-red-500' : 'border-blue-900'}`}
  placeholder="URL de la imagen"
  value={imagen}
  onChangeText={setImagen}
  placeholderTextColor="#aaa"
/>

<TouchableOpacity
  style={{ backgroundColor: '#1E3A8A', paddingVertical: 12, borderRadius: 20, marginTop: 16 }}
  onPress={handleSubirPublicacion}
>
  <Text style={tw`text-white text-xl font-bold text-center`}>Subir Publicación</Text>
</TouchableOpacity>
    </View>
      <Footer />
    </View>
  );
};

export default SubirPublicacion;
