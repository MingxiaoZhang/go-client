import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { GameMode, Piece, SocketAction } from '../enum';
import { placePiece as localPlacePiece } from '../redux/slices/localGameSlice';
import useGameState from './useGameState';
import { OnlineGameState } from '../redux/slices/onlineGameSlice';
import { LocalGameState } from '../redux/slices/localGameSlice';

const isOnlineGameState = (state: LocalGameState | OnlineGameState): state is OnlineGameState => {
    return (state as OnlineGameState).playerColor !== undefined;
}

const useActions = (gameMode: GameMode) => {
    const dispatch = useDispatch();
    const gameState = useGameState(gameMode);

    const placePiece = useCallback(
        ({ row, col }: {row: number, col: number}) => {
            if (!isOnlineGameState(gameState)) {
                dispatch(localPlacePiece({row, col, currentPlayer: gameState.currentPlayer}));
                return
            } 
            if (gameState.currentPlayer !== gameState.playerColor) {
                return
            }
            dispatch({
                type: SocketAction.PLAY_MOVE,
                payload: {
                    playerName: gameState.playerName,
                    row,
                    col,
                    playerColor: String(gameState.playerColor)
                }
            });
        },
        [dispatch]
    );

    return { placePiece };
};

export default useActions;
