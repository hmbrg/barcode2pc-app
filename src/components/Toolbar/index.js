import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { DangerZone } from "expo";
// const { GestureHandler } = DangerZone;
// const { BorderlessButton } = GestureHandler;
import { BorderlessButton } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

import CaptureButton from "./CaptureButton";
import TorchIcon from "./Torch"
import Icon from "../Icon";

export class Toolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
        <BorderlessButton
          style={styles.torch}
          activeOpacity={0.4}
          onPress={this.props.torch}>
          <TorchIcon torchActive={this.props.torchActive} />
        </BorderlessButton>
        <View style={styles.button}>
          <CaptureButton
            styles={styles.button}
            activate={this.props.captureActivate}
            deactivate={this.props.captureDeactivate}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    width: "100%",
    maxWidth: 350,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 20
  },
  torch: {
    flex: 1,
    height: 70,
    justifyContent: "center"
  },
  torchIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 50
  },
  button: {
    flex: 3,
    height: 70,
    zIndex: 2
  }
});

const mapStateToProps = (state, ownProps) => ({
  torchActive: state.toolbar.torchActive
});
const mapDispatchToProps = dispatch => ({
  captureActivate: () => dispatch.toolbar.captureActivate(),
  captureDeactivate: () => dispatch.toolbar.captureDeactivate(),
  torch: () => dispatch.toolbar.torch()
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
