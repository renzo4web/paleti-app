import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const ColorBox = ({ item, index }) => {
  const { colorName, hexCode } = item;

  const copyToClipboard = () => {
    Clipboard.setString(hexCode);
    Alert.alert('Text to clipboard', hexCode);
  };

  return (
    <TouchableOpacity
      onPress={copyToClipboard}
      style={[styles.container, { backgroundColor: hexCode }]}
    >
      <Text
        style={[
          styles.textBold,
          parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.5
            ? styles.darkText
            : styles.whiteText,
        ]}
      >
        {colorName}: {hexCode}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderRadius: 5,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },

  whiteText: {
    color: '#fff',
  },

  darkText: {
    color: '#000',
  },

  textBold: {
    fontWeight: 'bold',
  },
});
export default ColorBox;
