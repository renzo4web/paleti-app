import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { paletteName, colors } = route.params;
  return (
    <View style={styles.safeArea}>
      <FlatList
        data={colors}
        renderItem={ColorBox}
        keyExtractor={({ hexCode }) => hexCode}
        ListHeaderComponent={
          <Text style={styles.textBold}>Name: {paletteName}</Text>
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
    backgroundColor: "white",
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
    fontWeight: 'bold',
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
