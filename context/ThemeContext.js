import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { View } from 'react-native';

const Context = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <Context.Provider value={{ theme, setTheme }}>
      <View style={{ backgroundColor: '#000', flex: 1 }}>{children}</View>
    </Context.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(Context);
};

export default ThemeContext;
