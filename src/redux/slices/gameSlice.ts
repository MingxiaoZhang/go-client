// src/redux/slices/gameSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Piece } from '../../enum';

interface GameState {
    isGameStarted: boolean;
    playerIds: {[key in Piece]: string};
    isLocal: boolean;
    roomId: string;
  }

const initialState: GameState = {
    isGameStarted: false,
    isLocal: true,
    roomId: '',
    playerIds: {
      [Piece.BLACK]: 'Player 1',
      [Piece.WHITE]: 'Player 2',
      [Piece.NONE]: ''
    }
  }

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
        state.isGameStarted = true;
    },
  },
});

export const { startGame } = gameSlice.actions;
export default gameSlice.reducer;
