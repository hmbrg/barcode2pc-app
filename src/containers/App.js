import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import Constants from "expo-constants";
import { connect } from "react-redux";

import Card from "../components/Card.js";
import Scanner from "../components/Scanner.js";
import Toolbar from "../components/Toolbar/index.js";

export class App extends React.Component {
  state = {
    ready: false,
    hasCameraPermission: null
  };

  async componentDidMount() {
    await Font.loadAsync({
      "roboto-mono-medium": require("../../assets/fonts/RobotoMono/RobotoMono-Medium.ttf")
    });
    this.setState({ ready: true });
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading onError={console.warn} />;
    }

    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.upper}>
            <Text style={styles.connected}>Connected to "MatthiasPC"</Text>
            <View style={styles.scanner}>
              <Scanner
                hasCameraPermissions={this.props.hasCameraPermissions}
                init={this.props.initScanner}
                scan={this.props.scan}
                torchActive={this.props.torchActive}
              />
            </View>
          </View>
          <View style={styles.lower}>
            <Toolbar />
            <Card
              cardType={this.props.cardType}
              show={this.props.showInfoCard}
              pressHello={this.props.pressHello}
            />
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  upper: {
    flex: 3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  lower: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20
  },
  connected: {
    fontFamily: "roboto-mono-medium",
    fontSize: 12,
    letterSpacing: 0.5,
    color: "black",
    marginTop: 6,
    marginBottom: 10
  },
  scanner: {
    //flex: 1,
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 2
  }
});

const mapStateToProps = (state, ownProps) => ({
  showInfoCard: state.app.showInfoCard,
  cardType: state.app.cardType,
  hasCameraPermissions: state.app.hasCameraPermissions,
  torchActive: state.toolbar.torchActive
});
const mapDispatchToProps = dispatch => ({
  pressHello: () => dispatch.app.pressHello(),
  initScanner: () => dispatch.app.initScanner(),
  scan: payload => dispatch.app.scan(payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
