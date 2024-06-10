import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { resetBoard, setBoardSize } from "../../redux/slices/onlineGameSlice";
import { startGame } from "../../redux/slices/localGameSlice";
import { BoardSize } from "../../enum";

const GameOptions = () => {
    const dispatch = useDispatch();
    const boardSize = useSelector((state: IRootState) => state.onlineGame.boardSize);
    
    return (
        <>
            <h2>Options</h2>
            <label>
                Select Board Size:
                <select
                    value={boardSize}
                    onChange={(e) =>
                        dispatch(setBoardSize(e.target.value as keyof typeof BoardSize))
                    }
                >
                    <option value={'SMALL'}>9x9</option>
                    <option value={'MEDIUM'}>13x13</option>
                    <option value={'LARGE'}>19x19</option>
                </select>
            </label>
            <label>
                Time Control:
                <select
                    value={boardSize}
                    onChange={(e) =>
                        dispatch(setBoardSize(e.target.value as keyof typeof BoardSize))
                    }
                >
                    <option value={'SMALL'}>9x9</option>
                    <option value={'MEDIUM'}>13x13</option>
                    <option value={'LARGE'}>19x19</option>
                </select>
            </label>
        </>
    );
}

export default GameOptions;