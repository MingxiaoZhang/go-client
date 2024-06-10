import { useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { GameMode } from '../enum';

const useGameState = (gameMode: GameMode) => {
    if (gameMode === GameMode.LOCAL) {
        return useSelector((state: IRootState) => state.localGame);
    } else {
        return useSelector((state: IRootState) => state.onlineGame);
    }
};

export default useGameState;