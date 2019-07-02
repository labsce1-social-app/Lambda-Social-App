import { AsyncStorage } from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
    try {
        const store = await AsyncStorage.setItem(key, JSON.stringify(val))
        return store;
    } catch (err) {
        console.log(err)
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        const item = JSON.parse(value)
        return item;
    } catch (err) {
        console.log(err)
    }
}

export const deleteData = async (key) => {
    try {
        await AsyncStorage.clear((err) => {
            if (err) {
                console.log(err)
            }
        })
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

