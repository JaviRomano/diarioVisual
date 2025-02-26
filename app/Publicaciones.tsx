import React, { Component, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  Button,
} from 'react-native';
import tw from 'twrnc';
import { createStackNavigator } from '@react-navigation/stack';
import SubirPublicacion from './SubirPublicacion';
import Header from './Header';
import Footer from './Footer';
import UploadIcon from './UploadIcon';
import { Ionicons } from '@expo/vector-icons';

interface Publicacion {
  imagen: string;
  titulo: string;
  contenido: string;
  fecha_publicacion: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const PublicacionModal = ({ visible, publicacion, onClose }: { visible: boolean, publicacion: Publicacion | null, onClose: () => void }) => (
  <Modal animationType='slide' transparent visible={visible} onRequestClose={onClose}>
    <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
      <View style={tw`bg-white rounded-lg w-11/12 p-4 shadow-lg`}>
        {publicacion ? (
          <>
            <Image source={{ uri: 'http://localhost/api-diario-visual/img/' + publicacion.imagen }} style={tw`h-96 w-full rounded-lg`} resizeMode='cover' />
            <Text style={tw`text-2xl font-bold text-gray-900 mt-4 mb-2`}>{publicacion.titulo}</Text>
            <Text style={tw`text-base text-gray-700 mb-4`}>{publicacion.contenido}</Text>
            <Text style={tw`text-sm text-gray-500`}>Publicado: {formatDate(publicacion.fecha_publicacion)}</Text>
            <Button title='Cerrar' color='#0D47A1' onPress={onClose} />
          </>
        ) : (
          <Text style={tw`text-center text-gray-500`}>No se encontró la publicación.</Text>
        )}
      </View>
    </View>
  </Modal>
);

const Publicaciones = ({ navigation }: { navigation: any }) => {
  const [publicaciones, setPublicaciones] = React.useState<Publicacion[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = React.useState<Publicacion | null>(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch('http://localhost/api-diario-visual/api-react/publicaciones.php', { method: 'GET' });
        const data = await response.json();
        setPublicaciones(data);
        setLoading(false);
      } catch (err) {
        setError('Error al conectar con el servidor. Revisa tu conexión.');
        setLoading(false);
        console.error('Error en la petición:', err);
      } 
    };

    fetchPublicaciones();
  }, []);

  const abrirModal = (publicacion: Publicacion): void => {
    setPublicacionSeleccionada(publicacion);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Publicacion }) => (
    <TouchableOpacity onPress={() => abrirModal(item)} style={tw`w-[48%] bg-white shadow-lg rounded-lg mb-4 mx-[1%] p-3`}>
      <Image source={{ uri: 'http://localhost/api-diario-visual/img/' + item.imagen }} style={tw`h-48 w-full rounded-lg`} resizeMode='cover' />
      <Text style={tw`text-lg font-semibold text-gray-800 mt-2`}>{item.titulo}</Text>
      <Text style={tw`text-sm text-gray-500 mt-1`}>{formatDate(item.fecha_publicacion)}</Text>
    </TouchableOpacity>
  );

      return (
        <View style={tw`flex-1 bg-black`}>
          <Header title="Miau" />
          <TouchableOpacity
        style={tw`absolute top-3.5 left-4`}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

          <View style={tw`flex-1 p-6 pb-16`}>
            {loading ? (
              <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#0D47A1" />
              </View>
            ) : error ? (
              <Text style={tw`text-red-500 text-center mt-10`}>{error}</Text>
            ) : (
              <>
                <FlatList
                  data={publicaciones}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  numColumns={2}
                  contentContainerStyle={tw`flex-grow pb-6`}
                  showsVerticalScrollIndicator={false}
                />

                <View style={tw`absolute bottom-10 left-0 right-0 flex items-center`}>
                  <UploadIcon onPress={() => navigation.navigate('SubirPublicacion')} />
                </View>
              </>
            )}
          </View>
          <Footer />
          <PublicacionModal visible={modalVisible} publicacion={publicacionSeleccionada} onClose={() => setModalVisible(false)} />
        </View>      
      );
    };    

    const Stack = createStackNavigator();

    const PublicacionesStack = () => (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="SubirPublicacion" component={SubirPublicacion} />
      </Stack.Navigator>
    );

  export default PublicacionesStack;