import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Font, BarCodeScanner, Permissions } from "expo";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect } from "react-redux";

import { actions } from "../reducers/App";

import Card from "../components/Card";

export class App extends React.Component {
  state = {
    fontLoaded: false,
    hasCameraPermission: null
  };

  async componentDidMount() {
    await Font.loadAsync({
      "roboto-mono-medium": require("../../assets/fonts/RobotoMono/RobotoMono-Medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { hasCameraPermission } = this.state;

    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <View style={{ flex: 1 }}>
            <View style={styles.upper}>
              <Text style={styles.connected}>Connected to "MatthiasPC"</Text>
              <View style={styles.scanner} />
            </View>
            <View style={styles.lower}>
              <Card cardType="hello" show={true} pressHello={this.props.pressHello} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight()
  },
  upper: {
    flex: 3,
    backgroundColor: "white",
    alignItems: "center"
  },
  lower: {
    flex: 2
  },
  connected: {
    fontFamily: "roboto-mono-medium",
    fontSize: 12,
    letterSpacing: 0.5,
    color: "black",
    marginTop: 6,
    marginBottom: 0
  },
  scanner: {
    backgroundColor: "#C4C4C4",
    flex: 1,
    alignSelf: "stretch",
    margin: 28,
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 1
  }
});

// const mapStateToProps = (state, ownProps) => ({ repos: state.repos });
const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(App);