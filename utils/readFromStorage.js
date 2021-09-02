import AsyncStorage from '@react-native-async-storage/async-storage';

export const readFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('COLORS');
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    return [];
  }
};
