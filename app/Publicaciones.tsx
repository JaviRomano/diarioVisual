import React, { Component } from 'react';
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

const formatDate = (dateString) => {
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

const Stack = createStackNavigator();

const PublicacionesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PublicacionesList" component={Publicaciones} />
    <Stack.Screen name="SubirPublicacion" component={SubirPublicacion} />
  </Stack.Navigator>
);

class Publicaciones extends Component {
  state = {
    publicaciones: [],
    loading: true,
    error: '',
    modalVisible: false,
    publicacionSeleccionada: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        'http://localhost/api-diario-visual/api-react/publicaciones.php',
        { method: 'GET' }
      );
      const data = await response.json();
      this.setState({ publicaciones: data, loading: false });
    } catch (err) {
      this.setState({
        error: 'Error al conectar con el servidor. Inténtelo más tarde.',
        loading: false,
      });
      console.error('Error en la petición:', err);
    }
  }

  abrirModal = (publicacion) => {
    this.setState({
      modalVisible: true,
      publicacionSeleccionada: publicacion,
    });
  };

  cerrarModal = () => {
    this.setState({
      modalVisible: false,
      publicacionSeleccionada: null,
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.abrirModal(item)}
      style={tw`w-[48%] bg-white shadow-lg rounded-lg mb-4 mx-[1%] p-3`}
    >
      <Image
        source={{
          uri: 'http://localhost/api-diario-visual/img/' + item.imagen,
        }}
        style={tw`h-48 w-full rounded-lg`}
        resizeMode="cover"
      />
      <Text style={tw`text-lg font-semibold text-gray-800 mt-2`}>
        {item.titulo}
      </Text>
      <Text style={tw`text-sm text-gray-500 mt-1`}>
        {formatDate(item.fecha_publicacion)}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { publicaciones, loading, error, modalVisible, publicacionSeleccionada } = this.state;

    return (
      <View style={tw`flex-1 bg-blue-100`}>
        <Header title="Miau" />

        <View style={tw`flex-1 p-6 pb-16`}>
          {loading ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size="x-large" color="#0D47A1" />
            </View>
          ) : error ? (
            <Text style={tw`text-red-500 text-center mt-10`}>{error}</Text>
          ) : (
            <>
              <FlatList
                data={publicaciones}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
                numColumns={2}
                contentContainerStyle={tw`flex-grow pb-6`}
                showsVerticalScrollIndicator={false}
              />

              <View style={tw`absolute bottom-10 left-0 right-0 flex items-center`}>
                <UploadIcon onPress={() => this.props.navigation.navigate('SubirPublicacion')} />
              </View>
            </>
          )}
        </View>

        <Footer />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.cerrarModal}
        >
          <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
            <View style={tw`bg-white rounded-lg w-11/12 p-4 shadow-lg`}>
              {publicacionSeleccionada ? (
                <>
                  <Image
                    source={{
                      uri: 'http://localhost/api-diario-visual/img/' + publicacionSeleccionada.imagen,
                    }}
                    style={tw`h-96 w-full rounded-lg`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-2xl font-bold text-gray-900 mt-4 mb-2`}>
                    {publicacionSeleccionada.titulo}
                  </Text>
                  <Text style={tw`text-base text-gray-700 mb-4`}>
                    {publicacionSeleccionada.contenido}
                  </Text>
                  <Text style={tw`text-sm text-gray-500`}>
                    Publicado: {formatDate(publicacionSeleccionada.fecha_publicacion)}
                  </Text>
                  <Button title="Cerrar" color="#800080" onPress={this.cerrarModal} />
                </>
              ) : (
                <Text style={tw`text-center text-gray-500`}>No se encontró la publicación.</Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default PublicacionesStack;