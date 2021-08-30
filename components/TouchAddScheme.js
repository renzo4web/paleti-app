import React from 'react';
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TouchAddScheme = ({ handlePress }) => {
  const [isLoad] = useFonts({
    Poppins_700Bold,
  });

  return (
    <TouchableOpacity style={styles.btnAddColor} onPress={handlePress}>
      <Text
        style={[styles.modalBtn, { fontFamily: isLoad && 'Poppins_700Bold' }]}
      >
        Add a color scheme
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBtn: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  btnAddColor: {
    backgroundColor: '#1c6ced',
    borderRadius: 9,
    padding: 9,
  },
});

export default TouchAddScheme;
