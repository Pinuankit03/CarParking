import AsyncStorage from '@react-native-community/async-storage';

export const KEYS = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',

  LANGUAGE: 'language',
};

const clearAuthSession = () =>
  new Promise(async (resolve, reject) => {
    try {
      const $keys = [
        KEYS.ACCESS_TOKEN,
      ]
      await AsyncStorage.multiRemove($keys)
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

const checkAuthSession = () =>
  new Promise(async (resolve, reject) => {
    try {
      const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);

      if (typeof token === 'string') {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });

const getAuthSession = () =>
  new Promise(async (resolve, reject) => {
    try {
      const authSession = {};

      const accessToken = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);

      if (typeof accessToken === 'string') {
        authSession.accessToken = accessToken;

        resolve(authSession);
      } else {
        reject();
      }
    } catch (error) {
      reject(error);
    }
  });

const setAuthSession = (authSession) =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, authSession.accessToken);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });



export default {
  KEYS,
  clearAuthSession,
  checkAuthSession,
  setAuthSession,
  getAuthSession,
};
