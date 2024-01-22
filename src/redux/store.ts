// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import boardReducer from './slices/boardSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    board: boardReducer,
  },
});

export default store;
