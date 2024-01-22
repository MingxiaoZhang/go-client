// src/redux/slices/boardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { BoardSize, Piece } from '../../enum';

interface BoardState {
  intersections: Piece[][];
  dimensions: keyof typeof BoardSize;
}

const initialState: BoardState = {
  intersections: [],
  dimensions: 'SMALL',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    placePiece: (state, action) => {
      const { row, col, currentPlayer } = action.payload;
      state.intersections[row][col] = currentPlayer;
    },
    setBoardDimensions: (state, action) => {
        const dimensions = action.payload;
        state.dimensions = dimensions;
        const size = BoardSize[dimensions as keyof typeof BoardSize];
        state.intersections = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
        console.log(dimensions,state.intersections);
    },
  },
});

export const { placePiece, setBoardDimensions } = boardSlice.actions;
export default boardSlice.reducer;
