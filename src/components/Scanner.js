import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import PropTypes from "prop-types";

export default class Scanner extends React.Component {
  componentWillMount() {
    this.props.init();
  }

  _handleBarCodeRead = event => {
    if (this.lastScan !== event.data) {
      this.props.scan(event);
      this.lastScan = event.data;
    }
  };

  render() {
    if (!this.props.hasCameraPermissions) {
      return null;
    }

    return (
      <View style={styles.wrapper}>
        <BarCodeScanner
          onBarCodeRead={this._handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden"
  }
});

Scanner.propTypes = {
  hasCameraPermissions: PropTypes.bool,
  init: PropTypes.func.isRequired,
  scan: PropTypes.func
};
