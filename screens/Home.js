import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PalettePreview from '../components/PalettePreview';

import ToggleTheme from '../components/ToggleTheme';
import TouchAddScheme from '../components/TouchAddScheme';
import { useThemeContext } from '../context/ThemeContext';

const Home = ({ navigation, route }) => {
  const {
    theme: [themeBg, themeText],
    setTheme,
  } = useThemeContext();

  const { paletteName, selectedColors } = route.params;
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let current = true;
    fetch('https://color-palette-api.kadikraman.vercel.app/palettes')
      .then((res) => res.json())
      .then((data) => {
        if (current) {
          setPalettes(data);
          setIsRefreshing(false);
        }
      });

    return () => (current = false);
  }, [setPalettes, isRefreshing]);

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
