import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import ColorBox from '../components/ColorBox';
import { useThemeContext } from '../context/ThemeContext';

const ColorPalette = ({ route }) => {
  const {
    theme: [themeBg, themeText],
  } = useThemeContext();
  const { paletteName, colors } = route.params;
  return (
    <View style={[styles.safeArea, { backgroundColor: themeBg }]}>
      <FlatList
        data={colors}
        renderItem={ColorBox}
        keyExtractor={({ hexCode }) => hexCode}
        ListHeaderComponent={
          <Text style={[styles.textBold, { color: themeText }]}>
            {paletteName}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },

  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderRadius: 5,
    paddingVertical: 10,
  },

  whiteText: {
    color: '#fff',
  },

  textBold: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cyan: {
    backgroundColor: '#2aa198',
  },

  blue: {
    backgroundColor: '#268bd2',
  },
  magenta: {
    backgroundColor: '#d33682',
  },
  orange: {
    backgroundColor: '#cb4b16',
  },
});
export default ColorPalette;
