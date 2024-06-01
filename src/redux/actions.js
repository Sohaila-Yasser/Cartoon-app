export const FETCH_FILMS_REQUEST = "FETCH_FILMS_REQUEST";
export const FETCH_FILMS_SUCCESS = "FETCH_FILMS_SUCCESS";
export const FETCH_FILMS_FAILURE = "FETCH_FILMS_FAILURE";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const RESET_FAVORITES = "RESET_FAVORITES";

export const fetchFilmsRequest = () => ({
  type: FETCH_FILMS_REQUEST,
});

export const fetchFilmsSuccess = (films) => ({
  type: FETCH_FILMS_SUCCESS,
  payload: films,
});

export const fetchFilmsFailure = (error) => ({
  type: FETCH_FILMS_FAILURE,
  payload: error,
});

export const addToFavorites = (film) => ({
  type: ADD_TO_FAVORITES,
  payload: film,
});

export const removeFromFavorites = (filmId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: filmId,
});

export const resetFavorites = () => ({
  type: RESET_FAVORITES,
});


export const fetchFilms = () => {
  return async (dispatch) => {
    dispatch(fetchFilmsRequest());
    try {
      const response = await fetch(
         "https://www.omdbapi.com/?s=cartoon&type=movie&apikey=34c8137",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cartoon films");
      }
      const data = await response.json();

      // Check for both data and Search property
      if (data && data.Search) {
        dispatch(fetchFilmsSuccess(data.Search));
      } else {
        // Handle empty search results (e.g., dispatch an action to indicate no films found)
        dispatch({ type: 'NO_FILMS_FOUND' }); 
      }
    } catch (error) {
      dispatch(fetchFilmsFailure(error.message));
    }
  };
};
