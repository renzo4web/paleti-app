import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import ColorBox from '../components/ColorBox';
import { useThemeContext } from '../context/ThemeContext';
import { readFromStorage } from '../utils/readFromStorage';
import { saveToStorage } from '../utils/saveToStorage';
import QRCode from 'react-native-qrcode-svg';

const ColorPalette = ({ route }) => {
  const {
    theme: [themeBg, themeText],
  } = useThemeContext();
  const { paletteName, colors, id } = route.params;

  const handleDeletePallete = () => {
    readFromStorage().then((palettes) => {
      console.log('object');
      saveToStorage(palettes.filter((pal) => pal.id === id));
    });
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: themeBg }]}>
      <FlatList
        data={colors}
        renderItem={ColorBox}
        keyExtractor={({ hexCode }) => hexCode}
        ListFooterComponent={
          <View
            style={{
              alignSelf: 'center',
              marginVertical: 25,
            }}
          >
            <QRCode
              size={300}
              backgroundColor={themeBg}
              color={themeText}
              value={`Palette Name : ${paletteName} \n
               Colors : ${JSON.stringify(colors, null, 2)}
              `}
            />
          </View>
        }
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}
          >
            <Text
              style={[
                styles.textBold,
                {
                  color: themeText,
                },
              ]}
            >
              {paletteName}
            </Text>
            <TouchableOpacity
              onPress={handleDeletePallete}
              style={{
                justifyContent: 'center',
                borderRadius: 30,
              }}
            />
          </View>
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
