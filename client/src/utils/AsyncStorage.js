import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
    const val = JSON.stringify(value)
    try {
        const store = await AsyncStorage.setItem(key, val)
        return store;
    } catch (err) {
        console.log(err)
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (key !== null) {
            return JSON.parse(value);
        }
    } catch (err) {
        console.log(err)
    }
}

export const deleteData = async () => {
    try {
        return AsyncStorage.getAllKeys()
            .then(AsyncStorage.multiRemove)
    } catch (err) {
        console.log(err)
        return false;
    }
}

