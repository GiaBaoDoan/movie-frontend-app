import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
var { width, height } = Dimensions.get("window");
const Trending = ({ title, data }) => {
  return (
    <View>
      <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
        {title}
      </Text>
      <Carousel
        data={data}
        renderItem={({ item, index }) => (
          <MovieCard item={item} index={index} />
        )}
        firstItem={2}
        inactiveSlideOpacity={0.4}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ marginTop: 20, display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default Trending;
const styles = StyleSheet.create({});
