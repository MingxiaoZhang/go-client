// src/components/Intersection.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Piece, PieceStyle, PlayerType, SocketAction } from '../../enum';
import { placePiece } from '../../redux/slices/boardSlice';
import { IRootState } from '../../redux/store';

interface IntersectionProps {
  size: number;
  row: number;
  col: number;
  piece: Piece;
}

const Intersection: React.FC<IntersectionProps> = ({ size, row, col, piece }) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state: any) => state.board.currentPlayer);
  const playerColor: Piece = useSelector((state: IRootState) => state.board.playerColor);
  const isLocal = useSelector((state: any) => state.board.isLocal);
  const playerName = useSelector((state: any) => state.board.playerName);

  const getWStyle = (row: number, col: number) => {
    if (col === size - 1) {
      return `w-1/2 absolute top-1/2`;
    }
    return "w-full absolute top-1/2 left-1/2";
  };
  const getHStyle = (row: number, col: number) => {
    if (row === size - 1) {
      return "h-1/2 absolute left-1/2";
    }
    return "h-full absolute top-1/2 left-1/2";
  };
  const handleClick = () => {
    if (isLocal && piece === Piece.NONE) {
      dispatch(placePiece({ row, col, currentPlayer }));
      return;
    }
    if (currentPlayer !== playerColor) {
      return
    }
    dispatch({type: SocketAction.PLAY_MOVE, payload: {playerName, row, col, playerColor: String(playerColor)}});
   
  };

  return (
    <div
      className={`flex-1 box-border relative hover:outline outline-blue-500 rounded-full ${PieceStyle[piece]}`}
      onClick={handleClick}
    >
      <div className={`${getWStyle(row, col)} h-px border-t border-black -z-10`}></div>
      <div className={`${getHStyle(row, col)} w-px border-l border-black -z-10`}></div>
    </div>
  );
};

export default Intersection;
