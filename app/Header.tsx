import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Header = ({ title }) => {
  return (
    <View style={tw`bg-blue-900 py-4 px-6`}>
      <Text style={tw`text-white text-2xl font-bold text-center`}>App Fotos</Text>
    </View>
  );
};

export default Header;
