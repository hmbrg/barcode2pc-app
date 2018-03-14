import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import CaptureButton from "./CaptureButton";

export class Toolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
        <View style={styles.tools} />
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
    paddingBottom: 50,
    backgroundColor: "blue"
  },
  tools: {
    width: 50,
    height: 50,

    backgroundColor: "red"
  },
  button: {
    width: 225,
    height: 70,
    marginLeft: 20,
    zIndex: 2,
    //overflow: "hidden",
    backgroundColor: "yellow"
  }
});

const mapStateToProps = (state, ownProps) => ({
  showInfoCard: state.app.showInfoCard,
  cardType: state.app.cardType
});
const mapDispatchToProps = dispatch => ({
  captureActivate: () => dispatch.toolbar.captureActivate(),
  captureDeactivate: () => dispatch.toolbar.captureDeactivate()
});

export default connect(null, mapDispatchToProps)(Toolbar);
