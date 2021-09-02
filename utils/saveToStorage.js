import AsyncStorage from '@react-native-async-storage/async-storage';
import { readFromStorage } from './readFromStorage';

export const saveToStorage = async (newValue) => {
  try {
    const onStorage = await readFromStorage();
    let jsonValue;
    if (onStorage !== null) {
      console.log({ onStorage });
      jsonValue = JSON.stringify([...onStorage, newValue]);
    } else {
      jsonValue = JSON.stringify(newValue);
    }
    console.log('SAVE TO');
    await AsyncStorage.setItem('COLORS', jsonValue);
  } catch (e) {
    // saving error
    return {};
  }
};
