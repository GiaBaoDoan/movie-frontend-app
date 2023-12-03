import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image500 } from "../../api/database";
var { width, height } = Dimensions.get("window");

const MovieList = ({ data, title, hideSeeAll }) => {
  const navigation = useNavigation();
  useEffect(() => {}, []);
  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{title}</Text>

          {!hideSeeAll && (
            <Text style={{ color: "gold", fontSize: 18 }}>See All </Text>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        style={{ width: "100%" }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", { ...item })}
              style={{ marginTop: 30 }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Image
                  style={{
                    width: 0.33 * width,
                    height: height * 0.22,
                    borderRadius: 20,
                  }}
                  source={{
                    uri:
                      (item.poster_path && Image500(item.poster_path)) ||
                      "https://image.tmdb.org/t/p/w500/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
                  }}
                ></Image>
                <Text style={{ color: "#d4d4d4", marginTop: 10 }}>
                  {item.title
                    ? item.title.length > 14
                      ? item.title.slice(0, 14) + "..."
                      : item.title
                    : ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({});
