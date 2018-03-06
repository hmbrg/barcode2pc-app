import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  ScrollView
} from "react-native";

import {
  Hello,
  DisconnectedErr,
  AuthErr,
  OtherClientErr,
  CameraErr,
  GeneralErr
} from "./Cards";

import PropTypes from "prop-types";

export default class Card extends React.Component {
  state = {
    cardPosition: new Animated.Value(40),
    cardHeight: 0,
    opacity: 0,
  };

  onLayout = event => {
    const { height } = event.nativeEvent.layout;
    this.state.cardPosition.setValue(height);
    this.setState({ cardHeight: height, opacity: 1 });
  };

  chooseMessage() {
    switch (this.props.cardType) {
      case "hello":
        return <Hello press={this.props.pressHello} />;
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
      Animated.spring(this.state.cardPosition, {
        toValue: 0,
        overshootClamping: true,
        bounciness: 1,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(this.state.cardPosition, {
        toValue: this.state.cardHeight,
        overshootClamping: true,
        bounciness: 1,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    let { cardPosition } = this.state;

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[styles.card, { opacity: this.state.opacity }, { transform: [{ translateY: cardPosition }] }]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled={false}
        >
          {this.chooseMessage()}
        </ScrollView>
      </Animated.View>
    );
  }
}

Card.propTypes = {
  pressHello: PropTypes.func.isRequired,
  cardType: PropTypes.string,
  show: PropTypes.bool
};

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
