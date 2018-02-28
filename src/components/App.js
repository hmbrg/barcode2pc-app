import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <Text style={styles.connected}>Connected to "MatthiasPC"</Text>
          <View style={styles.scanner} />
        </View>
        <View style={styles.lower} />
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
    backgroundColor: "red",
    alignItems: "center"
  },
  lower: {
    flex: 2,
    backgroundColor: "yellow"
  }
});
