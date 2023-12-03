import axios from "axios";
import apikey, { apiKey } from "../src/constant/index";
const baseUrl = `https://api.themoviedb.org/3`;
const header =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmFiOTQ3Y2IwMGQ3MzdjNzVkMzFkMTIxMjYwMjFjNyIsInN1YiI6IjY1Njk0MWE3ZWEzN2UwMDBlYTQ2OGM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9EqqlFe1Xu_PzknkLbus3xSTVm7dsnqJg4we_cn-9o";
const trendingMoiveUrl = `${baseUrl}/trending/movie/day?api_key=${apikey}`;
const upcomingMovieUrl = `${baseUrl}/movie/upcoming?api_key=${apikey}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const SearchMovieEndPoint = `${baseUrl}/search/movie?api_key=${apiKey}`;
//
const detailPerson = (id) => `${baseUrl}/person/${id}?api_key=${apiKey}`;
const DeatialMovie = (id) => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const PersonMovie = (id) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
const DeatialCreditMovie = (id) =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const SimilarMovie = (id) => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;
export const Image500 = (item) => {
  const url = `https://image.tmdb.org/t/p/w500${item}`;
  return url;
};
export const Image300 = (item) => {
  const url = `https://image.tmdb.org/t/p/w300/${item} `;
  return url;
};
export const Image185 = (item) => {
  const url = `https://image.tmdb.org/t/p/w185/${item}`;
  return url;
};
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: { Authorization: `Bearer ${header}` },
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};
export const fetchTrendingMovie = () => {
  return apiCall(trendingMoiveUrl);
};
export const fetchUpcomingMovie = () => {
  return apiCall(upcomingMovieUrl);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
export const fetchMovieDetail = (id) => {
  return apiCall(DeatialMovie(id));
};
export const fetchCreditMovie = (id) => {
  return apiCall(DeatialCreditMovie(id));
};
export const fetchSimilarMovie = (id) => {
  return apiCall(SimilarMovie(id));
};
export const fetchDetailPerson = (id) => {
  return apiCall(detailPerson(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(PersonMovie(id));
};
export const SearchMovie = (params) => {
  return apiCall(SearchMovieEndPoint, params);
};
