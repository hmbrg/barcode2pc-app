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
              hasCameraPermission={this.props.hasCameraPermission}
              init={this.props.initScanner}
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
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 20
  },
  upper: {
    flex: 3,
    backgroundColor: "white",
    alignItems: "center"
  },
  lower: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end"
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
    flex: 1,
    width: "100%",
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 2
  }
});

const mapStateToProps = (state, ownProps) => ({
  showInfoCard: state.app.showInfoCard,
  cardType: state.app.cardType,
  hasCameraPermission: state.app.hasCameraPermission
});
const mapDispatchToProps = dispatch => ({
  pressHello: () => dispatch.app.pressHello(),
  initScanner: () => dispatch.app.initScanner()
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
