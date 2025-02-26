import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import PublicacionesStack from './Publicaciones';
import Register from './Registro';
import { SafeAreaView } from 'react-native';


const Stack = createStackNavigator();

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Publicaciones" component={PublicacionesStack} />
        <Stack.Screen name="Registro" component={Register}/>
      </Stack.Navigator>
    </SafeAreaView>
  );
}