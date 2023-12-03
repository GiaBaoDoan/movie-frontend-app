import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image500, fetchDetailPerson } from "../../api/database";
var { width, height } = Dimensions.get("window");

const Cast = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          color: "gray",
          fontSize: 20,
          marginTop: 20,
          marginHorizontal: 10,

          color: "white",
        }}
      >
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ marginTop: 20 }}
      >
        {data &&
          data.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Person", { ...item })}
                style={{
                  marginHorizontal: 10,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: width * 0.33,
                    height: width * 0.33,
                    borderRadius: 999,
                  }}
                  source={{
                    uri: item.profile_path && Image500(item.profile_path),
                  }}
                />
                <Text style={{ color: "gray", marginTop: 10 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({});
