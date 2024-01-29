// src/components/GoBoard.tsx
import React, { useEffect } from 'react';
import { BoardSize, BoardStyle } from '../../enum';
import Intersection from '../Intersection';
import { useDispatch, useSelector } from 'react-redux';
import { resetBoard } from '../../redux/slices/boardSlice';

const GoBoard = () => {
  const dispatch = useDispatch();
  const intersections = useSelector((state: any) => state.board.intersections);
  const size = useSelector((state: {board: {boardSize: keyof typeof BoardSize}}) => state.board.boardSize);
  const boardSize = BoardSize[size];

  useEffect(() => {
    dispatch(resetBoard())
  }, [size]);

  return (
    <div className={`${BoardStyle[size]} w-[580px] h-[580px]`}>
      {intersections && intersections.length > 0 && [...Array(boardSize * boardSize)].map((_, index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        return (
          <Intersection
            key={index}
            size={boardSize}
            row = {row}
            col = {col}
            piece = {intersections[row][col]}
          />
        )  
      })}
    </div>
  );
};

export default GoBoard;
