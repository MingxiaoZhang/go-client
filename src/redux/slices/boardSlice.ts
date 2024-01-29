// src/redux/slices/boardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { BoardSize, Piece, PlayerType, TimeControl } from '../../enum';
import { playMove } from '../../util/gameUtil';
import { Player } from '../../types';

interface BoardState {
  playerId: string;
  playerName: string;
  roomName: string;
  playerColor: Piece;
  intersections: Piece[][];
  boardSize: keyof typeof BoardSize;
  timeControl: keyof typeof TimeControl;
  currentPlayer: Piece;
  players: {[key in Piece]: Player};
  isLocal: boolean;
  isStarted: boolean;
  isCreated: boolean;
}

const initialState: BoardState = {
  playerId: '',
  playerName: 'Guest',
  roomName: '',
  playerColor: Piece.BLACK,
  intersections: [],
  boardSize: 'SMALL',
  timeControl: 'CLASSIC',
  currentPlayer: Piece.BLACK,
  players: {
    [Piece.BLACK]: {
      name: 'Guest',
      id: ''
    },
    [Piece.WHITE]: {
      name: '',
      id: ''
    },
    [Piece.NONE]: {
      name: '',
      id: ''
    },
  },
  isLocal: true,
  isStarted: false,
  isCreated: false
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setIsCreated: (state, action) => {
      state.isCreated = action.payload;
    },
    startGame: (state, action?) => {
      state.isStarted = true;
      if (action?.payload) {
        state.roomName = action.payload.roomName;
        state.boardSize = action.payload.boardSize;
        state.timeControl = action.payload.timeControl;
        const players = action.payload.players;
        state.players = players;
        if (players[Piece.BLACK].id === state.playerId) {
          state.playerColor = Piece.BLACK;
        } else {
          state.playerColor = Piece.WHITE;
        }
        state.isLocal = false;
      }
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.intersections = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
  },
    updateBoard: (state, action) => {
      const { board, currentPlayer } = action.payload;
      state.intersections = board;
      state.currentPlayer = currentPlayer;
    },
    placePiece: (state, action) => {
      const { row, col, currentPlayer } = action.payload;
      if (playMove(state.intersections, row, col, currentPlayer)) {
        state.currentPlayer = state.currentPlayer === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
      }
    },
    setPlayers: (state, action) => {
      const players = action.payload;
      state.players = players;
      if (players[Piece.BLACK].id === state.playerId) {
        state.playerColor = Piece.BLACK;
      } else {
        state.playerColor = Piece.WHITE;
      }
    },
    setPlayerID: (state, action) => {
      state.playerId = action.payload;
      state.players[state.playerColor].id = action.payload;
    },
    setBoardSize: (state, action) => {
        const dimensions = action.payload;
        state.boardSize = dimensions;
        const size = BoardSize[dimensions as keyof typeof BoardSize];
        state.intersections = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
    },
    resetBoard: (state) => {
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.intersections = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
      state.players[state.playerColor].name = action.payload;
      console.log(state.playerName);
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setTimeControl: (state, action) => {
      state.timeControl = action.payload;
    },
    setPlayerColor: (state, action) => {
      state.playerColor = action.payload;
    }
  },
});

export const {
  setIsCreated,
  setPlayerColor,
  setPlayerID,
  startGame,
  placePiece,
  setPlayerName,
  setBoardSize,
  resetBoard,
  setPlayers,
  updateBoard,
  setRoomName,
  setTimeControl
} = boardSlice.actions;
export default boardSlice.reducer;
