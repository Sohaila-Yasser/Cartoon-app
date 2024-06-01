import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './reducer'; // Assuming this is your films reducer import
import thunk from 'redux-thunk'; // Assuming you're using thunk middleware

const store = configureStore({
  reducer: filmsReducer,
  middleware: thunk,
});

export default store;







