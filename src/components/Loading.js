import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
var { width, height } = Dimensions.get("window");
import * as Progress from "react-native-progress";
const Loading = () => {
  return (
    <View
      style={{
        height: height * 0.8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Progress.CircleSnail thickness={10} color={"gold"} size={150} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
