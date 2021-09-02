import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

import ToggleTheme from '../components/ToggleTheme';
import TouchAddScheme from '../components/TouchAddScheme';
import { useThemeContext } from '../context/ThemeContext';
import { readFromStorage } from '../utils/readFromStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route }) => {
  const {
    theme: [themeBg, themeText],
  } = useThemeContext();

  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // TODO : LOAD PALLETS FROM LOCAL STORAGE WHEN HOME

  useEffect(() => {
    let current = true;
    fetch('https://color-palette-api.kadikraman.vercel.app/palettes')
      .then((res) => res.json())
      .then((data) => {
        if (current) {
          readFromStorage().then((storage) => {
            console.log({ storage });
            setPalettes([...storage, ...data].flat(1));
            setIsRefreshing(false);
          });
        }
      });

    return () => (current = false);
  }, [setPalettes, isRefreshing]);

  const handleDeletePalettes = useCallback(async () => {
    await AsyncStorage.clear();
  }, []);

  const handlePull = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeBg,
        },
      ]}
    >
      <FlatList
        style={styles.rowList}
        data={palettes}
        keyExtractor={(item) => item.id + item.paletteName}
        renderItem={({ item }) => (
          <PalettePreview item={item} navigation={navigation} />
        )}
        refreshing={isRefreshing}
        onRefresh={handlePull}
        ListHeaderComponent={
          <View style={styles.headerStyle}>
            <ToggleTheme />
            <TouchableOpacity
              style={{ color: themeText }}
              onPress={handleDeletePalettes}
            >
              <Text>DELETE ALL</Text>
            </TouchableOpacity>
            <TouchAddScheme
              handlePress={() => navigation.navigate('ColorPaletteModal')}
            />
          </View>
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

  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  rowList: {
    flex: 1,
  },
});

export default Home;
