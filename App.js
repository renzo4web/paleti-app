import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import ThemeContext from './context/ThemeContext';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeContext>
        <AppRouter />
      </ThemeContext>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  headerStyle: {},
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
});
