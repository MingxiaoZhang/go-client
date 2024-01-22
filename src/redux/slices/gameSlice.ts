// src/redux/slices/gameSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Piece } from '../../enum';

interface GameState {
    isGameStarted: boolean;
    currentPlayer: Piece.BLACK | Piece.WHITE;
  }

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isGameStarted: false,
    currentPlayer: Piece.BLACK
  },
  reducers: {
    startGame: (state) => {
        state.isGameStarted = true;
    },
    switchPlayer: (state) => {
        state.currentPlayer = state.currentPlayer === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
    },
  },
});

export const { startGame, switchPlayer } = gameSlice.actions;
export default gameSlice.reducer;
