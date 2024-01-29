// src/redux/store.ts
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import boardReducer from './slices/boardSlice';
import roomReducer from './slices/roomSlice';
import { socket } from '../sockets/socket';
import socketMiddleware from './middleware/socketMiddleware';


console.log("Middleware")

const store = configureStore({
  reducer: {
    game: gameReducer,
    board: boardReducer,
    room: roomReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(socketMiddleware(socket)),
});

export type IRootState = ReturnType<typeof store.getState>

export default store;
