import { Linking } from "react-native";

export const types = {
  PRESS_HELLO: "App/PRESS_HELLO",
  PRESSED_HELLO: "App/PRESSED_HELLO",
  CAMERAPER_REQUEST: "App/CAMERAPER_REQUEST",
  CAMERA_GOTPER: "App/CAMERA_GOTPER",
};

export const initialState = {
  showInfoCard: false,
  cardType: "hello"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CAMERAPER_REQUEST:
    case types.CAMERA_GOTPER:  
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const actions = {
  pressHello: () => dispatch => {
    Linking.openURL("http://google.com");
    dispatch({ type: types.PRESSED_HELLO });
  },
  needCameraPermission: () => ({
    type: types.CAMERAPER_REQUEST,
    payload: {
      cardType: "cameraErr",
      showInfoCard: true
    }
  }),
  gotCameraPermission: () => ({
    type: types.CAMERA_GOTPER,
    payload: {
      cardType: "hello",
      showInfoCard: false
    }
  }),
  signup: (email, password) => ({ type: types.PRESS_HELLO, email, password })
};
