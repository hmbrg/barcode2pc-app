import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import PropTypes from "prop-types";

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentWillMount() {
    try {
      this.setState({ hasCameraPermission: false });
      //const { status } = await Permissions.askAsync(Permissions.CAMERA);
      //this.setState({ hasCameraPermission: status === "granted" });

      if (!this.state.hasCameraPermission) {
				this.props.needCameraPermission();
				console.log("Nedd CAmerdf pef");

        const permissionTester = setInterval(async () => {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({ hasCameraPermission: status === "granted" });

          if (this.state.hasCameraPermission) {
            clearInterval(permissionTester);
          }
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }
}

Scanner.propTypes = {
  hasCameraPermission: PropTypes.bool,
  needCameraPermission: PropTypes.func.isRequired
};
