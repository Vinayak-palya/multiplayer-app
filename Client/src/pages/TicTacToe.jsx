import { useState } from "react"
import GameBoard from "../components/GameBoard.jsx";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setisXNext] = useState(true);
  const [numturn ,setnumTurn] = useState(0);

  const handleSquareClick = (index) => {
    if(!board[index])
    {
      setnumTurn(numturn => numturn + 1)
    }
    if(calculateWinner(board) || board[index]){
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setisXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  return (
    <div className="flex flex-col items-center bg-[#101827]">
      <GameBoard board={board} onSquareClick={handleSquareClick} />
      {winner ? (
        <p className="mt-4 text-xl text-green-400 font-semibold">Winner: {winner}</p>
      ) :
      (numturn < 9) ?
        (
        
          <p className="mt-4  text-lg text-white">{isXNext ? "Player X's Turn" : "Player O's Turn"}</p>
        ):
        (
          <p className="text-red-500 text-3xl mt-4  ">Draw</p>
        )
      }
    </div>
  )};

  const calculateWinner = (board) => {

    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  //columns
      [0, 4, 8], [2, 4, 6],    // diagonals
    ]
    for(let i = 0; i <  lines.length;i++)
    {
      const [a, b, c] = lines[i];
      if(board[a] && ((board[a] === board[b]) && (board[b] === board[c])))
      {
        return board[a];
      }
    }
  }
export default TicTacToe;