import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

const ToggleTheme = () => {
  const {
    theme: [themeBg, themeText],
    setTheme,
  } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={() =>
        setTheme((currTheme) => (currTheme === 'light' ? 'dark' : 'light'))
      }
      style={[
        styles.touch,
        { backgroundColor: themeBg, borderColor: themeText, borderWidth: 1 },
      ]}
    >
      <Text style={[styles.textList, { color: themeText }]}>Change theme</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
  },

  textList: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ToggleTheme;
