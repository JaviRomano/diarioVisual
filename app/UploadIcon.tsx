// UploadIcon.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const UploadIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ position: 'absolute', bottom: 20, right: 20 }}>
      <Svg width="65" height="65" fill="none" viewBox="0 0 65 65">
        <Circle cx="32.5" cy="32.5" r="31.5" fill="#EBF8FF" stroke="purple" strokeWidth="2" />
        <Path fill="purple" d="M30.455 47V17h5.09v30zM18 34.545v-5.09h30v5.09z" />
      </Svg>
    </TouchableOpacity>
  );
};

export default UploadIcon;