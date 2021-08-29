import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

const PreviewColors = ({ data, size = 40 }) => {
  const { colors, index } = data;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={colors.slice(0, 5)}
        keyExtractor={({ hexCode }) => hexCode}
        key={index}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
        horizontal
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.container,
                {
                  width: size * 1.5,
                  height: size,
                  backgroundColor: item.hexCode,
                },
              ]}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default PreviewColors;
