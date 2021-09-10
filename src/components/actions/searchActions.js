import axios from "axios";
import {
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  FIRST_SCREEN_TOGGLE,
  FETCH_AUTHOR_SUCCESS,
  SORT_DATE
} from "../constants";

export const sortedDateData = (data) => {
  return {
    type: SORT_DATE,
    payload: data,
  };
};

export const fetchSearchRequest = () => {
  return {
    type: FETCH_SEARCH_REQUEST,
  };
};

export const sortData = (category) => {
  return {
    type: category,
  };
};

export const fetchAuthorSuccess = (data) => {
  return {
    type: FETCH_AUTHOR_SUCCESS,
    payload: data,
  };
};

export const fetchSearchSuccess = (data) => {
  let bookDetailsArray = [];
  data.map((val) => {
    if (
      val.title !== undefined &&
      val.publish_date !== undefined &&
      val.authors !== undefined
    ) {
      const coverImage =
        val.covers === undefined
          ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
          : `http://covers.openlibrary.org/b/id/${[val.covers][0]}-M.jpg`;

      let newData = {
        publishedDate: val.publish_date,
        title: val.title,
        covers: coverImage,
        authors: val.authors[0].key,
      };
      bookDetailsArray.push(newData);
    }
  });
  
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: bookDetailsArray,
  };
};

export const firstScreenToggle = () => {
  return {
    type: FIRST_SCREEN_TOGGLE,
  };
};

export const fetchSearchResults = (searchValue) => {
  return (dispatch) => {
    axios
      .get(`https://openlibrary.org/search.json?q=${searchValue}`)
      .then((response) => {
        const searchData = response.data.docs;
        let authorsArray = searchData.map((data) => {
          if (data.author_key !== undefined) {
            return data.author_key[0];
          }
        });
        authorsArray = authorsArray.filter(function (element) {
          return element !== undefined;
        });

        const seedArray = searchData.map((data) => data.seed);

        let bookArray = [];
        seedArray.map((value) => {
          value.forEach((element) => {
            if (element.startsWith("/books/")) {
              bookArray.push(element);
            }
          });
        });

        const fetchData = async () => {
          try {
            const response = await Promise.all(
              bookArray.map((url) =>
                fetch(`https://openlibrary.org${url}.json`).then((res) =>
                  res.json()
                )
              )
            );

            const responseTwo = await Promise.all(
              authorsArray.map((url) =>
                fetch(
                  `https://openlibrary.org/authors/${url}.json`
                ).then((res) => res.json())
              )
            );
            dispatch(fetchAuthorSuccess(responseTwo));
            dispatch(fetchSearchSuccess(response));
          } catch (error) {
            console.log("Error", error);
          }
        };
        fetchData();
      });
  };
};
