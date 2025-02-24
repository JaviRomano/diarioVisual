import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Footer = () => {
  return (
    <View style={tw`bg-blue-900 py-3 px-6 absolute bottom-0 w-full`}>
      <Text style={tw`text-white text-center text-sm`}>© 2025 JaviRomano. All rights reserved.</Text>
    </View>
  );
};

export default Footer;
