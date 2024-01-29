// src/components/GamePage.tsx
import React, { useEffect, useState } from 'react';
import GoBoard from '../../components/GoBoard';
import { BoardSize, Piece } from '../../enum';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../redux/slices/gameSlice';
import { resetBoard, setBoardSize, setPlayers } from '../../redux/slices/boardSlice';

const LocalGamePage = () => {
    const dispatch = useDispatch();
    const isGameStarted = useSelector((state: any) => state.game.isGameStarted);
      
    const [options, setOptions] = useState({
        boardSize: 'SMALL',
        isBot: false,
        botColor: Piece.WHITE
    });
    useEffect(() => {
        dispatch(setBoardSize(options.boardSize));
      }, [dispatch, options.boardSize]);

    const handleOptionsChange = (option: string, value: (keyof typeof BoardSize) | boolean | Piece ) => {
        setOptions((prevOptions) => ({
        ...prevOptions,
        [option]: value,
        }));
    };
    const handleStartClick = () => {
        dispatch(resetBoard());
        dispatch(startGame());
    };

  return (
    <div className="flex flex-row">
      <GoBoard />
      <div className="flex-1">
        {
          !isGameStarted &&
          <>
            <h2>Options</h2>
          <label>
            Select Board Size:
            <select
              value={options.boardSize}
              onChange={(e) =>
                handleOptionsChange('boardSize', e.target.value as keyof typeof BoardSize)
              }
            >
              <option value={'SMALL'}>9x9</option>
              <option value={'MEDIUM'}>13x13</option>
              <option value={'LARGE'}>19x19</option>
            </select>
          </label>
          <label>
            VS
            <select value={options.isBot ? 'BOT' : 'HUMAN'}
              onChange={(e) => 
                handleOptionsChange('isBot', e.target.value === 'BOT')
              }
            >
              <option value={'HUMAN'}>Person</option>
              <option value={'BOT'}>Bot</option>
            </select>
          </label>
          {
            options.isBot && 
            <select value={options.botColor}
              onChange={(e) => 
                handleOptionsChange('botColor', e.target.value as Piece)
              }
            >
              <option value={Piece.BLACK}>Black</option>
              <option value={Piece.WHITE}>White</option>
            </select>
          }
            </>
        }
        {!isGameStarted && (
          <button onClick={handleStartClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default LocalGamePage;
