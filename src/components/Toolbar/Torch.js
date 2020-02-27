import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

export default function Torch(props) {
  return (
    <View
      style={[
        styles.torchIcon,
        { backgroundColor: props.torchActive ? "black" : "#F0F0F0" }
      ]}>
      <Icon
        name={"torch-active"}
        size={50}
        style={[styles.icon, { opacity: props.torchActive ? 1 : 0 }]}
      />
      <Icon name={"torch"} size={50} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  torchIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //position: "absolute",
    backgroundColor: "#F0F0F0",
    borderRadius: 50
  },
  icon: {
    position: "absolute",
    left: 0,
    right: 0
  }
});

Torch.propTypes = {
  torchActive: PropTypes.bool.isRequired
};
