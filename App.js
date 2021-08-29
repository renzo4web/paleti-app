import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import ColorPaletteModal from './screens/ColorPaletteModal';
import ThemeContext, { useThemeContext } from './context/ThemeContext';

const RootStack = createStackNavigator();

export default function App() {
  const { theme } = useThemeContext();

  const currentBgColor = theme === 'light' ? '#fff' : '#000';
  const currentTextColor = theme === 'light' ? '#000' : '#ffff';

  return (
    <NavigationContainer>
      <ThemeContext>
        {/* // TODO move navigator to a separate compnent */}
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen
              name="Home"
              component={Home}
              initialParams={{ paletteName: '', selectedColors: [] }}
              options={{
                headerStyle: {
                  backgroundColor: currentBgColor,
                },
                headerTintColor: '#fff',
              }}
            />
            <RootStack.Screen
              options={({ route }) => ({ title: route.params.paletteName })}
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
