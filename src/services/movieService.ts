import type { Movie } from "../types/movie";
import axios from "axios";

interface TmdbMovieResponse {
  results: Movie[];
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const SEARCH_MOVIE_ENDPOINT = `${BASE_URL}/search/movie`;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<TmdbMovieResponse>(SEARCH_MOVIE_ENDPOINT, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });
  return response.data.results || [];
};
