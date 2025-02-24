import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import PublicacionesStack from './Publicaciones';
import Register from './Registro';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Publicaciones" component={PublicacionesStack} />
          <Stack.Screen name="Registro" component={Register} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}