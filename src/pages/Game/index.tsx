// src/components/GamePage.tsx
import React, { useEffect, useState } from 'react';
import GoBoard from '../../components/GoBoard';
import { BoardSize } from '../../enum';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../redux/slices/gameSlice';
import { setBoardDimensions } from '../../redux/slices/boardSlice';

interface GamePageProps {
  size: keyof typeof BoardSize;
}

const GamePage: React.FC<GamePageProps> = ({ size }) => {
    const dispatch = useDispatch();
    const isGameStarted = useSelector((state: any) => state.game.isGameStarted);
      
    const [options, setOptions] = useState({
        boardSize: size,
        showCoordinates: true,
        showBorders: true,
    });
    useEffect(() => {
        console.log("dispathed")
        dispatch(setBoardDimensions(options.boardSize));
      }, [dispatch, size, options.boardSize]);

    const handleOptionsChange = (option: string, value: string | boolean) => {
        setOptions((prevOptions) => ({
        ...prevOptions,
        [option]: value,
        }));
    };
    const handleStartClick = () => {
        dispatch(startGame());
    };

  return (
    <div>
      <div>
        <h1>Game Board</h1>
        <GoBoard />
      </div>
      <div>
        <h2>Options</h2>
        <label>
          Select Board Size:
          <select value={options.boardSize} onChange={(e) => handleOptionsChange('boardSize', e.target.value)}>
            <option value={'SMALL'}>9x9</option>
            <option value={'MEDIUM'}>13x13</option>
            <option value={'LARGE'}>19x19</option>
          </select>
        </label>
        {!isGameStarted && (
          <button onClick={handleStartClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default GamePage;
