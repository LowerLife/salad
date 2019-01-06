import _ from "lodash";
import { AsyncStorage } from "react-native";

export const USER = "USER";

const setItem = (key: string, value: string) =>
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value, errors => {
      if (_.isEmpty(errors)) {
        resolve(true);
        return;
      }
      reject(errors);
    });
  });

const getItem = (key: string) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (errors, result) => {
      if (_.isEmpty(errors)) {
        resolve(result);
        return;
      }
      reject(errors);
    });
  });

const clear = () => AsyncStorage.clear();

export const LocalStorage = { clear, setItem, getItem };
