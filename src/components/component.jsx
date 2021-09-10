import { useState, useEffect, useRef } from "react";
import React from "react";
import PropTypes from "prop-types";

import FirstScreen from "./firstScreen";
import Loader from "./Loader";
import {
  SELECT_OPTION,
  SORT_BY_DATE_ASC,
  SORT_BY_DATE_DESC,
  SORT_BY_TITLE_A_Z,
  SORT_BY_TITLE_Z_A,
} from "./constants";
import { compareDateAsc, compareDateDesc } from "./_helpers/sortDate";

const BookApp = (props) => {
  const {
    data,
    fetchSearchResults,
    fetchSearchRequest,
    firstScreenToggle,
    sortData,
    sortedDateData,
  } = props;

  const inputRef = useRef();

  const [searchValue, setSearchValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sortValue, setSortValue] = useState(SELECT_OPTION);

  useEffect(() => {
inputRef.current.focus();
  }, [])
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (e) => {
    const sortVal = e.target.value;
    setSortValue(e.target.value);
    if (sortVal === SORT_BY_TITLE_A_Z || SORT_BY_TITLE_Z_A) {
      sortData(sortVal);
    }
    if (sortVal === SORT_BY_DATE_ASC) {
      const sortedData = data.data.sort(compareDateAsc);
      sortedDateData(sortedData);
    }
    if (sortVal === SORT_BY_DATE_DESC) {
      const sortedData = data.data.sort(compareDateDesc);
      sortedDateData(sortedData);
    }
  };

  const handleSearch = () => {
    let searchTitle = searchValue;
    if (searchValue.length > 2) {
      searchTitle = searchTitle.replace(/ /g, "+");
      setSortValue(SELECT_OPTION);
      firstScreenToggle();
      fetchSearchRequest();
      fetchSearchResults(searchTitle);
      setErrorMsg("");
    } else {
      setErrorMsg("Please enter more than 2 characters");
      inputRef.current.focus();
    }
  };

  const authors = data.authorData;
  return (
    <>
      <div className="fullWidth">
        <div className="search-form">
          <p className="error-p">{errorMsg}</p>
          <input
            data-testid="search-input"
            type="text"
            ref={inputRef}
            className="input-text"
            placeholder="Enter book title"
            onChange={handleChange}
            aria-label="Enter Bok Title"
            aria-required="true"
            name="searchBox"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSearch();
              }
            }}
          />
          <button
            data-testid="search-button"
            className="input-button"
            aria-label="Search Button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {data.firstScreen ? (
          <FirstScreen />
        ) : data.loading ? (
          <Loader />
        ) : data.data.length > 0 ? (
          <div className="container-result">
            <div className="container-sort">
              <select value={sortValue} onChange={handleSort}>
                <option value={SELECT_OPTION}>Sort By Option</option>
                <option value={SORT_BY_TITLE_A_Z}>Title: A - Z</option>
                <option value={SORT_BY_TITLE_Z_A}>Title: Z - A</option>
                <option value={SORT_BY_DATE_DESC}>Date: Current - Past</option>
                <option value={SORT_BY_DATE_ASC}>Date: Past - Current</option>
              </select>
            </div>
            {data.data.map((val, id) => {
              const authorName = authors.filter(
                (film) => film.key === val.authors
              );
              return (
                <div className="conatiner-box" key={id}>
                  <img
                    src={val.covers}
                    className="container-img"
                    alt={`${val.itle}-Cover`}
                  />
                  <h4>Title: {val.title}</h4>
                  <h4>Published Date: {val.publishedDate}</h4>
                  <h4>
                    Author: {authorName.slice(0, 1).map((val) => val.name)}
                  </h4>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className="noResult-text">
            No Results Found, Please enter something like "The Great Gatsby"{" "}
          </h2>
        )}
      </div>
    </>
  );
};

BookApp.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  fetchSearchRequest: PropTypes.func.isRequired,
  firstScreenToggle: PropTypes.func.isRequired,
  sortData: PropTypes.func.isRequired,
  sortedDateData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default BookApp;
