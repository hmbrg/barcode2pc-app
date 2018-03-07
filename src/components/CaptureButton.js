import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";

import { DangerZone } from "expo";
const { GestureHandler } = DangerZone;
const { PanGestureHandler, BaseButton, State } = GestureHandler;

const useNativeDriver = true;

const UnlockButtton = ({ enabled, onPress }) => {
  return (
    <BaseButton
      onPress={onPress}
      onHandlerStateChange={event => {
        console.log(event.nativeEvent.state);
      }}
      onActiveStateChange={value => {
        console.log("Acitve? " + value);
      }}
      id="lokok"
      style={styles.buttonSize}
      enabled={enabled}
    >
      <Text>Infinite</Text>
    </BaseButton>
  );
};

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderLocked: false
    };

    this.translateX = new Animated.Value(0);
    this.opacityLayer2 = new Animated.Value(0);

    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX
          }
        }
      ],
      { useNativeDriver }
    );

    this.dragX = this.translateX.interpolate({
      inputRange: [0, 75],
      outputRange: [0, 75],
      extrapolate: "clamp"
    });

    this.opacityLayer1 = this.translateX.interpolate({
      inputRange: [0, 50, 75],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.opacityLocker = this.translateX.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
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
    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationX >= 75) {
        this.lockButton();
      } else {
        this.setBackButton();
      }
    }
  };

  unlockPress = () => {
    alert("sdfsfd");
  };

  render() {
    return (
      <View style={[styles.buttonSize]}>
        <Animated.View
          style={[
            styles.locker,
            styles.buttonSize,
            { opacity: this.opacityLocker }
          ]}
        >
          <Text>LOCK</Text>
        </Animated.View>

        <PanGestureHandler
          {...this.props}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}
          enabled={!this.state.sliderLocked}
          id="drag"
        >
          <Animated.View
            style={[
              styles.buttonSize,
              { transform: [{ translateX: this.dragX }] }
            ]}
          >
            <Animated.View style={[styles.buttonSize, styles.active]}>
              <Text>Hold</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.buttonSize,
                styles.infinite,
                { opacity: this.opacityLayer1 }
              ]}
            >
              <Text>Infinite</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.buttonSize,
                styles.infinite,
                { opacity: this.opacityLayer2 }
              ]}
            >
              <UnlockButtton
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

const styles = StyleSheet.create({
  buttonSize: {
    width: "100%",
    aspectRatio: 2,
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
    backgroundColor: "blue",
    left: 75
  }
});
