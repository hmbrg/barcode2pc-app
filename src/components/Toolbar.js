import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import CaptureButton from "./CaptureButton";

export default (Toolbar = () => {
  return (
    <View style={styles.toolbar}>
      <View style={styles.tools} />
      <View style={[styles.button, styles.center]}>
        <CaptureButton />
      </View>
      <View style={styles.tools} />
    </View>
  );
});

const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 2
  },
  tools: {
    flex: 1,
    height: 100
  },
  button: {
    flex: 2,
    height: 100
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
});
