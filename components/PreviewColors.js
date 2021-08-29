import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

const PreviewColors = ({ data, size = 40 }) => {
  const { colors, index } = data;
  return (
    <FlatList
      data={colors.slice(0, 5)}
      keyExtractor={({ hexCode }) => hexCode}
      key={index}
      numColumns={5}
      renderItem={({ item }) => {
        return (
          <View
            style={[
              styles.container,
              {
                width: size,
                height: size,
                backgroundColor: item.hexCode,
              },
            ]}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 5,
  },
});

export default PreviewColors;
