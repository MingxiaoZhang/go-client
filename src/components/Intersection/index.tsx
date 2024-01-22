// src/components/Intersection.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Piece } from '../../enum';
import { placePiece } from '../../redux/slices/boardSlice';
import { switchPlayer } from '../../redux/slices/gameSlice';

interface IntersectionProps {
  size: number;
  row: number;
  col: number;
  piece: Piece;
}

const Intersection: React.FC<IntersectionProps> = ({ size, row, col, piece }) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state: any) => state.game.currentPlayer);

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
    if (piece !== Piece.NONE) {
      return
    }
    dispatch(placePiece({ row, col, currentPlayer }));
    dispatch(switchPlayer());
  };

  return (
    <div
      className={`flex-1 box-border relative hover:outline outline-blue-500 rounded-full ${piece}`}
      onClick={handleClick}
    >
      <div className={`${getWStyle(row, col)} h-px border-t border-black -z-10`}></div>
      <div className={`${getHStyle(row, col)} w-px border-l border-black -z-10`}></div>
    </div>
  );
};

export default Intersection;
