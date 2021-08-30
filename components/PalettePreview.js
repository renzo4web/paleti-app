import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import PreviewColors from './PreviewColors';

const PalettePreview = ({ item, navigation }) => {
  const {
    theme: [themeBg, themeText],
  } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ColorPalette', {
          paletteName: item.paletteName,
          colors: item.colors,
        })
      }
      style={styles.container}
    >
      <View style={styles.containerPreview}>
        <Text style={[styles.textList, { color: themeText }]}>
          {item.paletteName}
        </Text>
        <PreviewColors data={item} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowList: {
    flex: 1,
  },

  containerPreview: {
    marginVertical: 20,
    flex: 1,
  },

  textList: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
  },

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

export default PalettePreview;
