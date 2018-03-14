import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

import { DangerZone } from "expo";
const { GestureHandler } = DangerZone;
const { PanGestureHandler, BaseButton, State } = GestureHandler;

const useNativeDriver = true;

export default class CaptureButton extends Component {
  state = {
    sliderLocked: false,
    dimensions: undefined
  };

  /*   
  Setup Layout and Animators
 */
  setupDimensions = event => {
    if (this.state.dimensions) return;
    const width =
      event.nativeEvent.layout.width - event.nativeEvent.layout.width / 3;

    this.setupAnimators(width);
    this.setState({ dimensions: { width } });
  };

  setupAnimators = btnWidth => {
    const offset = btnWidth / 2;
    this.translateX = new Animated.Value(0);
    this.opacityLayer1 = new Animated.Value(1);
    this.opacityLayer3 = new Animated.Value(0);

    this.panGesture = Animated.event(
      [{ nativeEvent: { translationX: this.translateX } }],
      { useNativeDriver }
    );

    this.dragX = this.translateX.interpolate({
      inputRange: [0, offset],
      outputRange: [0, offset],
      extrapolate: "clamp"
    });

    this.opacityLayer2 = this.translateX.interpolate({
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

  /*
  Button Animations
  */
  btnSetBack = () => {
    return Animated.timing(this.translateX, {
      toValue: 0,
      duration: 150,
      easing: Easing.easeIn,
      useNativeDriver
    });
  };

  btnLock = () => {
    return Animated.parallel([
      Animated.timing(this.translateX, {
        toValue: 0,
        duration: 250,
        easing: Easing.easeIn,
        useNativeDriver
      }),
      this.opacityLayer3.setValue(1)
    ]);
  };

  btnUnlock = () => {
    return Animated.timing(this.opacityLayer3, {
      toValue: 0,
      duration: 150,
      easing: Easing.easeIn,
      useNativeDriver
    });
  };

  btnPressDown = () => {
    return Animated.timing(this.opacityLayer1, {
      toValue: 0,
      duration: 150,
      easing: Easing.easeIn,
      useNativeDriver
    });
  };

  btnPressUp = () => {
    return Animated.timing(this.opacityLayer1, {
      toValue: 1,
      duration: 150,
      easing: Easing.easeIn,
      useNativeDriver
    });
  };

  /* 
  Gesture Handling
   */
  panHandler = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationX >= this.state.dimensions.width / 2) {
       
        this.pressStatus("panLock");
      } else {
        
        this.pressStatus("panSetBack");
      }
    }
  };

  pressHandler = event => {
    if (
      event.nativeEvent.state === State.ACTIVE ||
      event.nativeEvent.state === State.CANCELLED
    ) {
      this.pressStatus("btnPressDown");
    } else if (event.nativeEvent.state === State.END) {
      this.pressStatus("btnPressUp");
    }
  };

  locked = false;
  active = false;
  pressStatus = value => {
    const oldActive = this.active;

    if (value === "btnPress" && this.locked && this.active) {
      this.locked = false;
      this.active = false;

      this.setState({ sliderLocked: false });
      Animated.parallel([this.btnPressUp(), this.btnUnlock()]).start();
    }

    if (value === "btnPressDown" && !this.locked && !this.active) {
      this.locked = false;
      this.active = true;

      this.btnPressDown().start();
    }

    if (value === "btnPressUp" && !this.locked && this.active) {
      this.locked = false;
      this.active = false;

      this.btnPressUp().start();
    }

    if (value === "panLock" && !this.locked) {
      this.locked = true;
      this.active = true;

      this.setState({ sliderLocked: true });
      this.btnLock().start();
    }

    if (value === "panSetBack" && !this.locked) {
      this.locked = false;
      this.active = false;

      Animated.parallel([this.btnPressUp(), this.btnSetBack()]).start();
    }
    console.log(value, "locked:", this.locked, "active:", this.active);

    if (this.active !== oldActive) {
      if (this.active) {
        this.props.activate();
      } else {
        this.props.deactivate();
      }
    }
  };

  render() {
    if (this.state.dimensions) {
      var { dimensions } = this.state;
      var buttonWidth = { width: dimensions.width };
    } else {
      return <View onLayout={this.setupDimensions} />;
    }

    const basicButtonsStyle = [styles.buttonSize, buttonWidth];
    const overflowButtonsStyle = [...basicButtonsStyle, styles.infinite];

    return (
      <View>
        <Animated.View
          style={[
            ...basicButtonsStyle,
            styles.locker,
            { left: buttonWidth.width / 2 },
            { opacity: this.opacityLocker }
          ]}
        />
        <PanGestureHandler
          onGestureEvent={this.panGesture}
          onHandlerStateChange={this.panHandler}
          enabled={!this.state.sliderLocked}>
          <Animated.View
            style={[
              ...basicButtonsStyle,
              { transform: [{ translateX: this.dragX }] }
            ]}>
            <BaseButton
              style={{ flex: 1 }}
              onHandlerStateChange={this.pressHandler}
              onPress={() => this.pressStatus("btnPress")}>
              <View style={styles.active} />

              <Animated.View
                style={[
                  ...overflowButtonsStyle,
                  { backgroundColor: "green" },
                  { opacity: this.opacityLayer1 }
                ]}
              />
              <Animated.View
                style={[
                  ...overflowButtonsStyle,
                  { opacity: this.opacityLayer2 }
                ]}
              />
              <Animated.View
                style={[
                  ...overflowButtonsStyle,
                  { opacity: this.opacityLayer3 }
                ]}
              />
            </BaseButton>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

CaptureButton.propTypes = {
  activate: PropTypes.func,
  deactivate: PropTypes.func
}

const styles = StyleSheet.create({
  buttonSize: {
    height: "100%",
    borderRadius: 10,
    overflow: "hidden"
  },
  active: {
    flex: 1,
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
