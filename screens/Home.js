import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PreviewColors from '../components/PreviewColors';
import { useThemeContext } from '../context/ThemeContext';

const Home = ({ navigation, route }) => {
  const { paletteName, selectedColors } = route.params;
  const [palettes, setPalettes] = useState([]);
  const [isRefresing, setIsRefresing] = useState(false);
  const {
    theme: [themeBg, themeText],
    setTheme,
  } = useThemeContext();

  useEffect(() => {
    let current = true;
    fetch('https://color-palette-api.kadikraman.vercel.app/palettes')
      .then((res) => res.json())
      .then((data) => {
        if (current) {
          setPalettes(data);
          setIsRefresing(false);
        }
      });

    return () => (current = false);
  }, [setPalettes, isRefresing]);

  useEffect(() => {
    setPalettes((currentPalettes) => [
      {
        id: currentPalettes.length - 1,
        paletteName,
        colors: selectedColors,
      },
      ...currentPalettes,
    ]);
  }, [paletteName, selectedColors]);

  const handlePull = useCallback(() => {
    setIsRefresing(true);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: themeBg }]}>
      <TouchableOpacity
        onPress={() =>
          setTheme((currTheme) => (currTheme === 'light' ? 'dark' : 'light'))
        }
        style={[
          styles.modalBtn,
          styles.btnAddColor,
          { backgroundColor: themeBg, borderColor: themeText, borderWidth: 1 },
        ]}
      >
        <Text style={[styles.textList, { color: themeText }]}>
          Change theme
        </Text>
      </TouchableOpacity>
      <FlatList
        style={styles.rowList}
        data={palettes}
        keyExtractor={(item) => item.id + item.paletteName}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ColorPalette', {
                paletteName: item.paletteName,
                colors: item.colors,
              })
            }
            style={{ flex: 1 }}
          >
            <View style={styles.containerPreview}>
              <Text style={[styles.textList, { color: themeText }]}>
                {item.paletteName}
              </Text>
              <PreviewColors data={item} />
            </View>
          </TouchableOpacity>
        )}
        refreshing={isRefresing}
        onRefresh={handlePull}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.btnAddColor}
            onPress={() => navigation.navigate('ColorPaletteModal')}
          >
            <Text style={styles.modalBtn}>Add a color scheme</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingTop: 10,
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
    color: '#000000',
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

export default Home;
