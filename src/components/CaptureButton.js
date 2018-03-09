import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

import { DangerZone } from "expo";
const { GestureHandler } = DangerZone;
const { PanGestureHandler, BaseButton, State } = GestureHandler;

const useNativeDriver = true;

const UnlockButtton = ({ enabled, onPress, width }) => {
  return (
    <BaseButton
      onPress={onPress}
      onActiveStateChange={value => {
        console.log("Acitve? " + value);
      }}
      style={[styles.buttonSize, width]}
      enabled={enabled}>
      <Text>Infinite</Text>
    </BaseButton>
  );
};

export default class CaptureButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderLocked: false,
      dimensions: undefined
    };
  }

  setBackButton = () => {
    Animated.timing(this.translateX, {
      toValue: 0,
      duration: 150,
      easing: Easing.easeIn,
      useNativeDriver
    }).start();
  };

  lockButton = () => {
    Animated.parallel([
      Animated.timing(this.translateX, {
        toValue: 0,
        duration: 250,
        easing: Easing.easeIn,
        useNativeDriver
      }),
      this.opacityLayer2.setValue(1)
    ]).start(() => {
      this.setState({ sliderLocked: true });
    });
  };

  onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("dfsdfsdfs");
      Animated.spring(this.buttonPopper, {
        toValue: 100
      }).start();
    }

    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationX >= this.state.dimensions.width / 2) {
        this.lockButton();
      } else {
        this.setBackButton();
      }
    }
  };

  unlockPress = () => {
    alert("sdfsfd");
  };

  onLayout = event => {
    if (this.state.dimensions) return;
    const width =
      event.nativeEvent.layout.width - event.nativeEvent.layout.width / 3;

    this.setupAnimators(width);
    this.setState({ dimensions: { width } });
  };

  setupAnimators = btnWidth => {
    const offset = btnWidth / 2;
    this.translateX = new Animated.Value(0);
    this.opacityLayer2 = new Animated.Value(0);
    this.buttonPopper = new Animated.Value(0);

    this.onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this.translateX } }],
      { useNativeDriver }
    );

    this.buttonPop = this.buttonPopper.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [1, 1.2, 1]
    });

    this.dragX = this.translateX.interpolate({
      inputRange: [0, offset],
      outputRange: [0, offset],
      extrapolate: "clamp"
    });

    this.opacityLayer1 = this.translateX.interpolate({
      inputRange: [0, offset * 0.6, offset],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.opacityLocker = this.translateX.interpolate({
      inputRange: [0, offset * 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
  };

  render() {
    if (this.state.dimensions) {
      var { dimensions } = this.state;
      var buttonWidth = { width: dimensions.width };
    } else {
      return <View onLayout={this.onLayout} />;
    }

    return (
      <View>
        <Animated.View
          style={[
            styles.locker,
            styles.buttonSize,
            buttonWidth,
            { left: buttonWidth.width / 2 },
            { opacity: this.opacityLocker }
          ]}>
          <Text>LOCK</Text>
        </Animated.View>

        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}
          enabled={!this.state.sliderLocked}>
          {/* MAIN BUTTON VIEW */}
          <Animated.View
            style={[
              styles.buttonSize,
              buttonWidth,
              { transform: [{ scale: this.buttonPop }] },
              { transform: [{ translateX: this.dragX }] }
            ]}>
            <View style={[styles.buttonSize, buttonWidth, styles.active]}>
              <Text>Hold</Text>
            </View>
            <Animated.View
              style={[
                styles.buttonSize,
                buttonWidth,
                styles.infinite,
                { opacity: this.opacityLayer1 }
              ]}>
              <Text>Infinite</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.buttonSize,
                buttonWidth,
                styles.infinite,
                { opacity: this.opacityLayer2 }
              ]}>
              <UnlockButtton
                width={buttonWidth}
                enabled={this.state.sliderLocked}
                onPress={this.unlockPress}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

UnlockButtton.propTypes = {
  activate: PropTypes.func,
  deactivate: PropTypes.func
};

const styles = StyleSheet.create({
  buttonSize: {
    height: "100%",
    borderRadius: 10
  },
  active: {
    backgroundColor: "#FF0F00"
  },
  infinite: {
    backgroundColor: "#FF7A00",
    position: "absolute"
  },
  locker: {
    position: "absolute",
    backgroundColor: "blue"
  }
});
