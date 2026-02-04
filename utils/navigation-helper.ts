import { PersistAtom } from "@/api/persist/jotai";
import {
  handleSaveTemporaryBackRoute,
  handleSetCurrentPath,
} from "@/api/persist/temp-param/action";
import { ParamAtom } from "@/api/persist/temp-param/jotai";
import store from "@/api/store";
import { Screen } from "@/constants/screens";

import { router } from "expo-router";

export type Navigation = {
  pathname: any;
  params?: any;
};

const navigate = (navigation: Navigation) => {
  handleSetCurrentPath(navigation.pathname);
  router.navigate({
    pathname: navigation.pathname,
    params: navigation.params,
  });
};

const push = (navigation: Navigation) => {
  handleSetCurrentPath(navigation.pathname);
  router.push({
    pathname: navigation.pathname,
    params: navigation.params,
  });
};

const reset = (navigation: Navigation) => {
  handleSetCurrentPath(navigation.pathname);
  if (router.canGoBack()) {
    router.dismissAll();
  }
  router.replace({
    pathname: navigation.pathname,
    params: navigation.params,
  });
};

const replace = (navigation: Navigation) => {
  handleSetCurrentPath(navigation.pathname);
  router.replace({
    pathname: navigation.pathname,
    params: navigation.params,
  });
};

const back = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    replace({ pathname: Screen.Tab.home });
  }
};

const getPathName = () => {
  return store.get(ParamAtom).current_path ?? "";
};

const authNavigate = (navigation: Navigation) => {
  const { isAuthenticated } = store.get(PersistAtom);
  if (isAuthenticated) {
    router.navigate({
      pathname: navigation.pathname,
      params: navigation.params,
    });
  } else {
    handleSaveTemporaryBackRoute(getPathName(), navigation.params);
    // handleSaveTemporaryBackRoute(navigation.pathname, navigation.params);
    navigate({ pathname: Screen.Auth.sign_in });
  }
};

export const NavigationHelper = {
  navigate,
  push,
  reset,
  back,
  replace,
  authNavigate,
  getPathName,
};
