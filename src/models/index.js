import { Linking } from "react-native";

import {
  waitforCameraPermissions,
  checkCameraPermissions
} from "../services/cameraPermissions";

export const app = {
  state: {
    showInfoCard: false,
    cardType: "hello",
    hasCameraPermissions: false
  },
  reducers: {
    showCard(state, payload) {
      return { ...state, cardType: payload, showInfoCard: true };
    },
    hideCard(state) {
      return { ...state, showInfoCard: false };
    },
    gotCameraPermissions(state) {
      return { ...state, hasCameraPermissions: true };
    }
  },
  effects: {
    pressHello(payload, state) {
      Linking.openURL("http://google.com");
    },
    async initScanner(payload, state) {
      let gotPerms = await checkCameraPermissions();
      if (gotPerms) {
        this.gotCameraPermissions();
      } else {
        this.showCard("cameraErr");
        await waitforCameraPermissions();
        this.hideCard();
        this.gotCameraPermissions();
      }
    },
    async scan(payload, state) {
      //<this.showCard("code")
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
      return { ...state, torchActive: !state.torchActive };
    }
  }
};
