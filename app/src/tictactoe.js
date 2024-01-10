'use client';

import "../tictactoe.css";
import { useState } from 'react';

function Square({ index, value, onSquareClick }) {
    return <button className="square" onClick={() => onSquareClick(index)}>{value}</button>;
}

function Board({ isXNext, squares, onPlay }) {

    let winner = calculateWinner(squares);
    let status = 'Next player: ' + (isXNext ? 'X' : 'O');
    if (winner)
        status = winner + ' WINS!';

    function handleSquareClick(index) {
        if (squares[index] || calculateWinner(squares))
        return;
    
        let newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        onPlay(newSquares);
    }

    return <>
        <div className="status">{status}</div>
        <div className="board-row">
        <Square index={0} value={squares[0]} onSquareClick={handleSquareClick} />
        <Square index={1} value={squares[1]} onSquareClick={handleSquareClick} />
        <Square index={2} value={squares[2]} onSquareClick={handleSquareClick} />
      </div>
      <div className="board-row">
        <Square index={3} value={squares[3]} onSquareClick={handleSquareClick} />
        <Square index={4} value={squares[4]} onSquareClick={handleSquareClick} />
        <Square index={5} value={squares[5]} onSquareClick={handleSquareClick} />
      </div>
      <div className="board-row">
        <Square index={6} value={squares[6]} onSquareClick={handleSquareClick} />
        <Square index={7} value={squares[7]} onSquareClick={handleSquareClick} />
        <Square index={8} value={squares[8]} onSquareClick={handleSquareClick} />
      </div>
  </>;
}
export default function Game() {
    const [ history, setHistory ] = useState([Array(9).fill(null)]);
    const [ currentMove, setCurrentMove ] = useState(0);
    const [ isXNext, setIsXNext ] = useState(true);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setIsXNext(!isXNext);
    }
    function jumpTo(moveIndex) {
        setCurrentMove(moveIndex);
        setIsXNext(moveIndex % 2 === 0);
    }

    const moves = history.map((squares, moveIndex) => {
        let msg = 'Go to move #' + moveIndex;
        if (moveIndex === 0)
            msg = 'Go to game start';

        return <li key={moveIndex}><button onClick={() => jumpTo(moveIndex)}>{msg}</button></li>
    });

    return <div className="game tictactoe">
      <div className="game-board">
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>;
}
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }