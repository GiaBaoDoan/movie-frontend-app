import {
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
var { width, height } = Dimensions.get("window");
import React from "react";
import { Image500 } from "../../api/database";

const MovieCard = ({ item, index }) => {
  return (
    <TouchableWithoutFeedback key={index}>
      <Image
        style={{ width: width * 0.6, borderRadius: 30, height: width }}
        source={{ uri: Image500(item.poster_path) }}
      ></Image>
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
