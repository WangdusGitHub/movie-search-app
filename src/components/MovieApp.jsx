import React from "react";
import "./MovieApp.css";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [expendedMovieId, setExpendedMovieId] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: "b65c1c9d1454769a1afa6f51155c3552",
          },
        }
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "b65c1c9d1454769a1afa6f51155c3552",
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: searchQuery,
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "b65c1c9d1454769a1afa6f51155c3552",
          query: searchQuery,
        },
      }
    );
    setMovies(response.data.results);
  };

  const toggleDescription = (movieId) => {
    setExpendedMovieId(expendedMovieId === movieId ? null : movieId);
  };

  return (
    <>
      <h1>MovieApp</h1>
      <div className="search-bar">
        <input
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search..."
        />
        <button type="text" onClick={handleSearchSubmit} className="search-btn">
          <IoMdSearch />
        </button>
      </div>

      <div className="filters">
        <label htmlFor="sort-by">Sort By: </label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc"> Popularity Descending</option>
          <option value="popularity.asc"> Popularity Ascending </option>
          <option value="vote_average.desc"> vote average Decending</option>
          <option value="vote_average.asc"> vote average Ascending</option>
          <option value="release_date.desc"> release date Decending</option>
          <option value="release_date.asc "> release date Ascending</option>
        </select>

        <label htmlFor="genre">Genre: </label>
        <select
          name="genre"
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="movie-wrapper">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p className="rating">Rating: {movie.vote_average}</p>
            {expendedMovieId === movie.id ? (
              <p>{movie.overview}</p>
            ) : (
              <p>{movie.overview.substring(0, 150)}...</p>
            )}
            <button
              onClick={() => {
                toggleDescription(movie.id);
              }}
              className="read-more"
            >
              {expendedMovieId === movie.id ? "show less" : "read more"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieApp;
