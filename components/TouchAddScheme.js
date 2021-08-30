import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TouchAddScheme = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnAddColor} onPress={handlePress}>
      <Text style={styles.modalBtn}>Add a color scheme</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBtn: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  btnAddColor: {
    backgroundColor: '#fda866',
    borderRadius: 9,
  },
});

export default TouchAddScheme;
