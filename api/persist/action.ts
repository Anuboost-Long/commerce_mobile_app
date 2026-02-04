import { StorageKeys } from "@/constants/storage-keys";
import { StorageUtil } from "@/utils/storage-helper";
import { Persist, PersistAtom } from "./jotai";
import DeviceInfo from "react-native-device-info";
import store from "@/api/store";
import { HandleError } from "@/utils/error-message-helper";
import { translation } from "@/constants/translation";
import { ApiService } from "@/api/api-helper";
import { EndPoints } from "@/api/api-config";

export const handleGetPersistStorage = async () => {
  const response = await StorageUtil.getData(StorageKeys.persist);
  if (response) {
    store.set(PersistAtom, response);
    return response;
  } else {
    const device_id = await DeviceInfo.getUniqueId();

    handleSetPersistStorage({
      fcm_token: null,
      isAuthenticated: false,
      device_id: device_id,
      language: "en",
      theme: "system",
      profile: null,
    });
    return {
      fcm_token: null,
      isAuthenticated: false,
      language: "en",
      theme: "system",
      device_id: device_id,
      profile: null,
    };
  }
};

export const handleSetPersistStorage = (persist: Persist) => {
  const _persist = { ...store.get(PersistAtom), ...persist };
  StorageUtil.setData({
    key: StorageKeys.persist,
    value: JSON.stringify(_persist),
  });
  store.set(PersistAtom, (prev) => ({ ...prev, ...persist }));
};

export const handleClearPersistStorage = () => {
  const _persist = {
    ...store.get(PersistAtom),
    ...{ isAuthenticated: false, token: null, profile: null },
  };
  StorageUtil.setData({
    key: StorageKeys.persist,
    value: JSON.stringify(_persist),
  });
  store.set(PersistAtom, _persist);
};

export const handleSyncQuote = async () => {
  try {
    await ApiService({
      url: EndPoints.sync_quote,
      method: "PUT",
    });
  } catch {
    HandleError(translation.AlertMessage.UnexpectedError);
  }
};
