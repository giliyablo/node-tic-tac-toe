import React, { useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {

    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i: number) => {
        const historyCopy = history.slice(0, stepNumber + 1);
        const current = historyCopy[historyCopy.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(historyCopy.concat([{squares}]));
        setStepNumber(historyCopy.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0)
    }

    const calculateWinner = (squares: (string | null)[]) => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [2,4,6]
        ];
        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if (squares[a] && 
                squares[a] === squares[b] && 
                squares[a] === squares[c]){
                return squares[a];
            }
        }
        return null;
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner){
        status = 'Winner: ' + winner;
    }else{
        status = 'Next Player is: ' + (xIsNext ? 'X' : 'O');   
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>
                    {history.map((_, move) => {
                        const desc = move ? 'Go to move #' + move : 'Go to game start';
                        return (
                            <li key={move}>
                                <button onClick={() => jumpTo(move)}>{desc}</button>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
};

export default Game
