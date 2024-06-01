import {
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  RESET_FAVORITES
} from "./actions";


const loadFavoritesFromStorage = () => {
  if (typeof window !== 'undefined') {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};

const initialState = {
  films: [],
  loading: false,
  error: null,
  favorites: loadFavoritesFromStorage(),
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FILMS_SUCCESS:
      return {
        ...state,
        loading: false,
        films: action.payload,
      };
    case FETCH_FILMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case ADD_TO_FAVORITES:
        if (typeof window !== 'undefined') {
          // Check if the film is already in favorites
          if (state.favorites.some((fav) => fav.imdbID === action.payload.imdbID)) {
            return state; // Return the state unchanged if the film is already in favorites
          }
          const updatedFavorites = [...state.favorites, action.payload];
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update local storage
          return {
            ...state,
            favorites: updatedFavorites,
          };
        }
        return state;

      case REMOVE_FROM_FAVORITES:
        if (typeof window !== 'undefined') {
          const filteredFavorites = state.favorites.filter((film) => film.imdbID !== action.payload);
          localStorage.setItem('favorites', JSON.stringify(filteredFavorites)); // Update local storage
          return {
            ...state,
            favorites: filteredFavorites,
          };
        }
        return state;

      case RESET_FAVORITES:
        if (typeof window !== 'undefined') {
          localStorage.removeItem('favorites'); // Remove favorites from local storage
        }
        return {
          ...state,
          favorites: [],
        };

    default:
      return state;
  }
};

export default filmsReducer;

