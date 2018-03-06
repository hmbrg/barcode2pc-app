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
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === "granted" });

      if (!this.state.hasCameraPermission) {
        this.props.needCameraPermission();
        console.log("Nedd CAmerdf pef");

        var permissionTester = setInterval(async () => {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({ hasCameraPermission: status === "granted" });

          if (this.state.hasCameraPermission) {
            console.log("HAS PERMUSSIONSSSS");
            this.props.gotCameraPermission();
            clearInterval(permissionTester);
          }
        }, 1000);
      } else {
        this.props.gotCameraPermission();
      }
    } catch (e) {
      console.log(e);
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    let { hasCameraPermission } = this.state;

    // Only for testing (sry...)
    hasCameraPermission = false;
    if (hasCameraPermission) {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

Scanner.propTypes = {
  needCameraPermission: PropTypes.func.isRequired,
  gotCameraPermission: PropTypes.func.isRequired,
  barcodeType: PropTypes.string
};
