import React from "react";
import "./MovieApp.css";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
    console.log(response.data.results);
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
        <select
          name="sort-by"
          id="sort-by"
          // value={sortBy}
          // onChange={hsndleSortChange}
        >
          <option value="popularity.decs"> Popularity Descending</option>
          <option value="popularity.acs"> Popularity Ascending </option>
          <option value="vote_average.decs"> vote average Decending</option>
          <option value="vote_average.acs"> vote average Ascending</option>
          <option value="release_date.decs"> release date Decending</option>
          <option value="release_date.acs"> release date Ascending</option>
        </select>
      </div>
    </>
  );
}

export default MovieApp;
