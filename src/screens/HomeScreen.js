import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import MovieList from "../components/MovieList";

import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Trending from "../components/Trending";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovie,
  fetchUpcomingMovie,
} from "../../api/database";

const HomeScreen = () => {
  const [trending, setTrending] = useState();
  const [upComimg, setUpcoming] = useState([]);
  const [rated, setRated] = useState([1, 2, 3]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    if (data && data.results) {
      setTrending(data.results);
    }
  };
  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie();
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };
  const getRatedMovie = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setRated(data.results);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getRatedMovie();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ height: "100%", backgroundColor: "rgb(38, 38, 38)" }}
    >
      <SafeAreaView style={{ marginTop: 30, marginHorizontal: 8 }}>
        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Bars3BottomLeftIcon strokeWidth={2} color="white" size={30} />
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
            <Text style={{ color: "gold" }}>M</Text>
            ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon
              onPress={() => navigation.navigate("Search")}
              strokeWidth={2}
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {/* movie trending carousel */}
            <Trending title="Trending" data={trending} />
            {/* Upcoming movie row */}
            <MovieList title="Upcoming" data={upComimg} />
            <MovieList title="Top Rated" data={rated} />
          </ScrollView>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
