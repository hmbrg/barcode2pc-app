import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

//import { DangerZone } from "expo";
//const { GestureHandler } = DangerZone;
import {
  PanGestureHandler,
  BaseButton,
  State
} from "react-native-gesture-handler";

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
    this.opacityLocker = new Animated.Value(0);
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

  lckHide = () => {
    return Animated.timing(this.opacityLocker, {
      toValue: 0,
      duration: 250,
      easing: Easing.easeOut,
      useNativeDriver
    });
  };

  lckShow = () => {
    return Animated.timing(this.opacityLocker, {
      toValue: 1,
      duration: 250,
      easing: Easing.easeOut,
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
      this.lckShow().start();
    }

    if (value === "btnPressUp" && !this.locked && this.active) {
      this.locked = false;
      this.active = false;

      this.btnPressUp().start();
      this.lckHide().start();
    }

    if (value === "panLock" && !this.locked) {
      this.locked = true;
      this.active = true;

      this.setState({ sliderLocked: true });
      this.btnLock().start();
      this.lckHide().start();
    }

    if (value === "panSetBack" && !this.locked) {
      this.locked = false;
      this.active = false;

      Animated.parallel([
        this.btnPressUp(),
        this.btnSetBack(),
        this.lckHide()
      ]).start();
    }

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
              {/* 
              <View style={styles.textContainer}>
                <Text style={styles.text}>Hold to scan</Text>
              </View> */}

              <View style={styles.active}>
                <Text style={styles.text}>Scanning</Text>
              </View>

              <Animated.View
                style={[
                  ...overflowButtonsStyle,
                  { backgroundColor: "#47FFA7" },
                  { opacity: this.opacityLayer1 }
                ]}>
                <Text style={styles.text}>Hold to scan</Text>
              </Animated.View>
              
              <Animated.View
                style={[
                  ...overflowButtonsStyle,
                  { opacity: this.opacityLayer2 }
                ]}>
                <Text style={styles.text}>Infinite mode</Text>
              </Animated.View>

              <Animated.View
                style={[
                  ...overflowButtonsStyle,
                  { opacity: this.opacityLayer3 }
                ]}>
                <Text style={styles.text}>Infinite mode</Text>
              </Animated.View>
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
};

const styles = StyleSheet.create({
  buttonSize: {
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center"
  },
  active: {
    flex: 1,
    backgroundColor: "#FF4D42",
    alignContent: "center",
    justifyContent: "center"
  },
  infinite: {
    backgroundColor: "#FF981F",
    position: "absolute"
  },
  locker: {
    position: "absolute",
    backgroundColor: "#EBEBEB"
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    alignContent: "center",
    justifyContent: "center"
  },
  text: {
    zIndex: 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: "center"
  }
});
