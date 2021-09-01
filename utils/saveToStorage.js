import AsyncStorage from '@react-native-async-storage/async-storage';
import { readFromStorage } from './readFromStorage';
export const saveToStorage = async (newValue) => {
  try {
    const onStorage = await readFromStorage();
    const jsonValue = JSON.stringify([...onStorage, newValue]);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    // saving error
    return {};
  }
};
