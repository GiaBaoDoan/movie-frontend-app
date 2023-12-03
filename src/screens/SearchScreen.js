import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { Image500, SearchMovie } from "../../api/database";
import { debounce } from "lodash";
import Loading from "../components/Loading";
var { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const [result, setResult] = useState();
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const handelOnchange = (value) => {
    setQuery(value);
  };

  const getSerachMovie = async (query) => {
    const res = await SearchMovie({
      query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    });
    if (res && res.results) {
      setLoading(false);
      setResult(res.results);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getSerachMovie(query);
    }, 300);
    return () => {
      setLoading(true);
      clearTimeout(timeoutId); // Clear timeout nếu query thay đổi trong khoảng thời gian delay
    };
  }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: "rgb(17, 17, 17)", flex: 1 }}>
      <View style={{ marginTop: 2, marginHorizontal: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 99,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <TextInput
            onChangeText={handelOnchange}
            placeholder="Search Movie"
            placeholderTextColor="white"
            style={{
              color: "gray",
              flex: 1,
              marginLeft: 20,
            }}
          ></TextInput>
          <TouchableOpacity
            style={{ backgroundColor: "gray", padding: 10, borderRadius: 999 }}
          >
            <XMarkIcon color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>Results ({result.length}) </Text>
          {loading ? (
            <Loading />
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: 20,

                flex: 2,
              }}
            >
              {result?.map((item) => {
                return (
                  <TouchableWithoutFeedback style={{ marginBottom: 10 }}>
                    <View
                      style={{
                        marginLeft: 2,
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Image
                        style={{
                          width: width * 0.44,
                          height: height * 0.3,
                          borderRadius: 20,
                        }}
                        source={{ uri: Image500(item?.poster_path) }}
                      ></Image>
                      <Text style={{ color: "gray", marginTop: 10 }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
              <View>
                {!query ? (
                  <Image
                    style={{ width: 350, height: 350 }}
                    source={require("../../assets/img/movieTime.png")}
                  ></Image>
                ) : (
                  ""
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  placeholder: {
    color: "gray",
  },
});
