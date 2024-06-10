// src/redux/slices/gameSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { BoardSize, Piece, TimeControl } from '../../enum';
import { playMove } from '../../util/gameUtil';

export type LocalGameState = {
    isGameStarted: boolean;
    board: Piece[][];
    boardSize: keyof typeof BoardSize;
    timeControl: keyof typeof TimeControl;
    currentPlayer: Piece;
    playerName: string;
  }

const initialState: LocalGameState = {
    isGameStarted: false,
    board: [],
    boardSize: 'SMALL',
    timeControl: 'CLASSIC',
    currentPlayer: Piece.BLACK,
    playerName: 'Guest'
  }

const localGameSlice = createSlice({
  name: 'localGame',
  initialState,
  reducers: {
    startGame: (state) => {
        state.isGameStarted = true;
    },
    endGame: (state) => {
      state.isGameStarted = false;
    },
    placePiece: (state, action: {payload: {row: number, col: number, currentPlayer: Piece}}) => {
      const { row, col, currentPlayer } = action.payload;
      if (playMove(state.board, row, col, currentPlayer)) {
        state.currentPlayer = state.currentPlayer === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
      }
    },
    resetBoard: (state) => {
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
    },
    setTimeControl: (state, action) => {
      state.timeControl = action.payload;
    },
  },
});

export const { startGame, endGame, placePiece, resetBoard, setTimeControl } = localGameSlice.actions;
export default localGameSlice.reducer;
