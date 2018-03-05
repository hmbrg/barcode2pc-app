import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";

import {
  Hello,
  DisconnectedErr,
  AuthErr,
  OtherClientErr,
  CameraErr,
  GeneralErr
} from "./Cards";

export default class Card extends React.Component {
  state = {
    cardPosition: new Animated.Value(40),
    cardHeight: 0,
    isClosed: true
  };

  onLayout = event => {
    const { height } = event.nativeEvent.layout;
    this.setState({ cardHeight: height });
    this.state.cardPosition.setValue(height);
  };

  chooseMessage() {
    switch (this.props.cardType) {
      case "hello":
        return <Hello />;
        break;
      case "disconnected":
        return <DisconnectedErr />;
        break;
      case "auth":
        return <AuthErr />;
        break;
      case "otherClient":
        return <OtherClientErr />;
        break;
      case "cameraErr":
        return <CameraErr />;
        break;
      default:
        return <GeneralErr />;
        break;
    }
  }

  componentDidUpdate() {
    if (this.props.show) {
      if (this.state.isClosed) {
        Animated.spring(this.state.cardPosition, {
          toValue: 0,
          overshootClamping: true,
          bounciness: 1,
          useNativeDriver: true
        }).start();

        this.state.isClosed = false;
      }
    } else {
      if (!this.state.isClosed) {
        Animated.spring(this.state.cardPosition, {
          toValue: this.state.cardHeight,
          overshootClamping: true,
          bounciness: 1,
          useNativeDriver: true
        }).start();

        this.state.isClosed = true;
      }
    }
  }

  render() {
    let { cardPosition } = this.state;

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[styles.card, { transform: [{ translateY: cardPosition }] }]}
      >
        {this.chooseMessage()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  }
});
