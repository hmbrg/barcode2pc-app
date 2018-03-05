import { Linking } from "react-native";

export const types = {
  PRESS_HELLO: "App/PRESS_HELLO",
  PRESSED_HELLO: "App/PRESSED_HELLO"
};

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
	pressHello: () => dispatch => {
		Linking.openURL("http://google.com");
		dispatch({ type: types.PRESSED_HELLO });
	},
  signup: (email, password) => ({ type: PRESSED_HELLO, email, password }),
};
