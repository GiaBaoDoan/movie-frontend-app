import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import {
  Image500,
  fetchCreditMovie,
  fetchMovieDetail,
  fetchPersonMovies,
  fetchSimilarMovie,
} from "../../api/database";
import Loading from "../components/Loading";
var { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const { params: item } = useRoute();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [detail, setDetail] = useState();
  const [similars, setSimilars] = useState();
  const [isLove, setIsLove] = useState(false);
  const [loading, setLoaing] = useState(true);
  const getDetailMovie = async (id) => {
    const data = await fetchMovieDetail(id);
    if (data) {
      setDetail(data);
      setLoaing(false);
    }
  };
  const getCreditsMovie = async (id) => {
    const data = await fetchCreditMovie(id);
    if (data) {
      setCast(data.cast);
    }
  };

  const getSimilarFilm = async (id) => {
    const data = await fetchSimilarMovie(id);
    if (data) {
      setSimilars(data.results);
    }
  };

  useEffect(() => {
    getDetailMovie(item.id);
    getSimilarFilm(item.id);
    getCreditsMovie(item.id);
  }, [item]);

  const naigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ backgroundColor: "rgb(17, 17, 17)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View>
            <View
              style={{
                position: "absolute",
                zIndex: 20,
                width: "100%",
                paddingHorizontal: 10,
                paddingTop: 30,
              }}
            >
              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => naigation.navigate("Home")}
                  style={{
                    backgroundColor: "gold",
                    borderRadius: 10,
                    padding: 3,
                  }}
                >
                  <ChevronLeftIcon size={28} color="white" strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLove(!isLove)}>
                  <HeartIcon
                    size={30}
                    color="white"
                    fill={`${isLove ? "red" : "white"}`}
                    strokeWidth={2.5}
                  />
                </TouchableOpacity>
              </SafeAreaView>
            </View>
            <View>
              <Image
                width={width}
                style={{ height: height * 0.6 }}
                source={{
                  uri: item.poster_path && Image500(item.poster_path),
                }}
              />
              <LinearGradient
                colors={["transparent", "rgba(14, 14, 14, 0.9)", "#121111"]}
                style={{
                  width: width,
                  height: height * 0.6,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          </View>
          <View style={{ marginTop: -(height * 0.09) }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 30,
              }}
            >
              {detail?.title}
            </Text>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#828181",
                  marginTop: 10,
                }}
              >
                {detail?.status} - {detail.release_date.split("-")[0]} -{" "}
                {detail.runtime} mins
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {detail?.genres?.map((item, index) => {
                  return index == detail.genres.length - 1 ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        color: "#828181",
                        marginTop: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        color: "#828181",
                        marginTop: 10,
                      }}
                    >
                      {item.name} -{" "}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              <Text
                style={{ color: "gray", marginHorizontal: 10, marginTop: 10 }}
              >
                {detail.overview}
              </Text>
            </View>
          </View>
          <Cast data={cast} naigation={naigation} />
          <MovieList title="Similar Movies" data={similars} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
