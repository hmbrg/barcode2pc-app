import { Linking } from "react-native";

export const app = {
  state: {
    showInfoCard: false,
    cardType: "hello"
  },
  reducers: {
    needCameraPermission(state) {
      return { ...state, cardType: "cameraErr", showInfoCard: true };
    },
    gotCameraPermission(state) {
      if (state.cardType === "cameraErr")
        return { ...state, showInfoCard: false };
      return state;
    }
  },
  effects: {
    pressHello(payload, state) {
      Linking.openURL("http://google.com");
    }
  }
};

export const toolbar = {
  state: {
    captureActive: false,
    torchActive: false
  },
  reducers: {
    captureActivate(state) {
      return { ...state, captureActive: true };
    },
    captureDeactivate(state) {
      return { ...state, captureActive: false };
    },
    torch(state, payload) {
      return { ...state };
    }
  }
};
