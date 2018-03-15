import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { DangerZone } from "expo";
const { GestureHandler } = DangerZone;
const { BorderlessButton } = GestureHandler;

import { Ionicons } from "@expo/vector-icons";

import CaptureButton from "./CaptureButton";

export class Toolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
        <BorderlessButton
          activeOpacity={0.4}
          onActiveStateChange={this.props.torch}>
          <View style={styles.tools}>
            <Ionicons name="md-flash" size={40} color="black" />
          </View>
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
    minWidth: 295,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50
  },
  tools: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 50,
    paddingTop: 5
  },
  button: {
    width: 225,
    height: 70,
    marginLeft: 20,
    zIndex: 2
  }
});

const mapStateToProps = (state, ownProps) => ({
  showInfoCard: state.app.showInfoCard,
  cardType: state.app.cardType
});
const mapDispatchToProps = dispatch => ({
  captureActivate: () => dispatch.toolbar.captureActivate(),
  captureDeactivate: () => dispatch.toolbar.captureDeactivate(),
  torch: value => dispatch.toolbar.torch(value)
});

export default connect(null, mapDispatchToProps)(Toolbar);
