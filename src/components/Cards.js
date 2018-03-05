import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Linking
} from "react-native";
import PropTypes from "prop-types";

export const Hello = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Hello.</Text>
      <Text style={styles.text}>
        Please open the app and scan the displayed code to connect to your
        machine to start scanning.
      </Text>
      <TouchableOpacity onPress={props.press}>
        <Text style={styles.text}>
          <Text style={[styles.text]}>
            If you don’t yet have the app installed on your machine
          </Text>
          <Text style={{ color: "#4D7EFF" }}> download it from here.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Hello.propTypes = {
  press: PropTypes.func.isRequired
};

export const DisconnectedErr = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, styles.error]}>Disconnected.</Text>
      <Text style={styles.text}>
        Please make sure you are in the same wifi network and the app on your
        machine is open.
      </Text>
      <Text style={styles.text}>
        Try again by scanning the barcode on your machine.
      </Text>
    </View>
  );
};

export const AuthErr = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, styles.error]}>Auth failed.</Text>
      <Text style={styles.text}>
        Authentication with your machine failed. Please try scanning the code
        again.
      </Text>
    </View>
  );
};

export const OtherClientErr = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, styles.error]}>Other client connected.</Text>
      <Text style={styles.text}>
        Another client is already connected to your machine. Disconnect the
        other client and try again.
      </Text>
    </View>
  );
};

export const CameraErr = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, styles.error]}>Camera error.</Text>
      <Text style={styles.text}>
        You didn’t allow use to use the camera, but without it you won’t be able
        to use this app.
      </Text>
      <Text style={styles.text}>
        Please give the app the camera permission from the “Settings” app.
      </Text>
    </View>
  );
};

export const GeneralErr = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, styles.error]}>Error. :(</Text>
      <Text style={styles.text}>
        Some weird error occured. Please try restarting the app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 20,
    marginLeft: 35
  },
  title: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 0.08
  },
  text: {
    fontSize: 19,
    color: "#706F75",
    marginTop: 10
  },
  error: {
    color: "#FF2B2B"
  }
});
