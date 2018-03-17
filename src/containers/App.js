import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Font, BarCodeScanner, Permissions, Constants, AppLoading } from "expo";
import { connect } from "react-redux";

import Card from "../components/Card";
import Scanner from "../components/Scanner";
import Toolbar from "../components/Toolbar";

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
      <View style={styles.container}>
          <View style={styles.upper}>
            <Text style={styles.connected}>Connected to "MatthiasPC"</Text>
            <View style={styles.scanner}>
              <Scanner
                needCameraPermission={this.props.needCameraPermission}
                gotCameraPermission={this.props.gotCameraPermission}
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
    alignItems: "center"
  },
  lower: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end"
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
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 1,
    overflow: "hidden"
  }
});

const mapStateToProps = (state, ownProps) => ({
  showInfoCard: state.app.showInfoCard,
  cardType: state.app.cardType
});
const mapDispatchToProps = dispatch => ({
  pressHello: () => dispatch.app.pressHello(),
  needCameraPermission: () => dispatch.app.needCameraPermission(),
  gotCameraPermission: () => dispatch.app.gotCameraPermission()
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
