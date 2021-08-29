import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PreviewColors from '../components/PreviewColors';

const Home = ({ navigation, route }) => {
  const { paletteName, selectedColors } = route.params;
  const [palettes, setPalettes] = useState([]);
  const [isRefresing, setIsRefresing] = useState(false);

  useEffect(() => {
    let current = true;
    fetch('https://color-palette-api.kadikraman.vercel.app/palettes')
      .then((res) => res.json())
      .then((data) => {
        if (current) {
          console.log('DATA FETCHED');
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
    <View style={styles.container}>
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
          >
            <View style={styles.containerPreview}>
              <Text style={styles.textList}>{item.paletteName}</Text>
              <PreviewColors data={item} />
            </View>
          </TouchableOpacity>
        )}
        refreshing={isRefresing}
        onRefresh={handlePull}
        ListHeaderComponent={
          <TouchableOpacity
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
    backgroundColor: 'white',
  },
  rowList: {
    flex: 1,
  },

  containerPreview: {
    marginVertical: 10,
  },

  textList: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },

  modalBtn: {
    fontSize: 20,
    color: 'teal',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Home;
