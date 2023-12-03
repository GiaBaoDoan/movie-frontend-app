import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import {
  Image500,
  fetchDetailPerson,
  fetchPersonMovies,
} from "../../api/database";
import Loading from "../components/Loading";
var { width, height } = Dimensions.get("window");
const Person = () => {
  const { params: item } = useRoute();
  const [detailPerson, setdetailPeron] = useState();
  const [personMovie, setPersonMovie] = useState();
  const [loading, setLoading] = useState(true);
  const getDetailPerson = async (id) => {
    const data = await fetchDetailPerson(id);
    if (data) return setdetailPeron(data);
  };
  const getPersonMovie = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data) {
      setPersonMovie(data.cast);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetailPerson(item.id);
    getPersonMovie(item.id);
  }, [item]);
  const [isLove, setIsLove] = useState(false);
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ backgroundColor: "rgb(17, 17, 17)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
          <SafeAreaView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: "gold", borderRadius: 10, padding: 3 }}
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
          <View
            style={{
              flexDirection: "row",
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: Image500(detailPerson?.profile_path) }}
              style={{
                width: width * 0.7,
                height: width * 0.7,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "gray",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 32, letterSpacing: 1 }}>
              {detailPerson?.name}
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: 10,
                fontSize: 14,
                letterSpacing: 0.5,
              }}
            >
              {detailPerson?.place_of_birth}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "rgb(44, 43, 43)",
              marginTop: 25,
              padding: 18,
              borderRadius: 999,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  paddingRight: 7,
                  borderColor: "white",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Gender
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {detailPerson?.gender == 2 ? "Male" : "Female"}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  paddingRight: 7,
                  marginLeft: 10,
                  borderColor: "white",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Birthday
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {detailPerson?.birthday}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  paddingRight: 7,
                  marginLeft: 10,
                  borderColor: "white",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>known for</Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {detailPerson?.known_for_department}
                </Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "white", fontSize: 16 }}>Popularity</Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {detailPerson?.popularity}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "white", fontSize: 20 }}>Biography</Text>
            <Text style={{ color: "gray", lineHeight: 20, marginTop: 10 }}>
              {detailPerson?.biography}
            </Text>
          </View>
          <MovieList data={personMovie} hideSeeAll={true} title="Movies" />
        </View>
      )}
    </ScrollView>
  );
};

export default Person;

const styles = StyleSheet.create({});
