import AsyncStorage from "@react-native-async-storage/async-storage";

const setData = ({ key, value }: { key: string; value: string }) => {
  AsyncStorage.setItem(key, value);
};

const getData = async (key: string) => {
  try {
    const response = await AsyncStorage.getItem(key);
    if (response) {
      return JSON.parse(response);
    } else {
      return null;
    }
  } catch (error) {
    showError(error);
  }
};

export const showLog = (data: any, ...OptionalParam: any) => {
  if (__DEV__) {
    console.log(data, ...OptionalParam);
  }
};

export const showError = (data: any, ...OptionalParam: any) => {
  if (__DEV__) {
    console.error(data, ...OptionalParam);
  }
};

export const StorageUtil = {
  getData,
  setData,
};
