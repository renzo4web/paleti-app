import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ColorPaletteModal from '../screens/ColorPaletteModal';
import ColorPalette from '../screens/ColorPalette';
import Home from '../screens/Home';
import { useThemeContext } from '../context/ThemeContext';

const RootStack = createStackNavigator();

const AppRouter = () => {
  const {
    theme: [themeBg, themeText],
  } = useThemeContext();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeBg,
        },
        headerTintColor: themeText,
      }}
    >
      <RootStack.Group>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen
          options={({ route }) => ({ title: 'All Palettes' })}
          name="ColorPalette"
          component={ColorPalette}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name={'ColorPaletteModal'}
          component={ColorPaletteModal}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default AppRouter;
