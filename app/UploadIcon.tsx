import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import tw from 'twrnc';

const UploadIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`absolute bottom-5 left-1/2 -translate-x-1/2 items-center`}>
      <Svg width="65" height="65" fill="none" viewBox="0 0 65 65">
        <Circle cx="32.5" cy="32.5" r="31.5" fill={tw.color('blue-300')}
          stroke={tw.color('blue-900')}
          strokeWidth="2" />
        <Path 
          fill={tw.color('blue-900')} 
          d="M30.455 47V17h5.09v30zM18 34.545v-5.09h30v5.09z" 
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default UploadIcon;