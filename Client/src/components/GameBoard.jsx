import PropTypes from 'prop-types';

const GameBoard = ({ board, onSquareClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 animate-fade-in">
      {board.map((square, index) => 
      (index%2 ===0) ?
      (
        <div
          key={index}
          className="w-20 h-20 flex items-center justify-center border-2 border-white text-xl text-white font-bold cursor-pointer hover:bg-blue-400 hover:border-black hover:opacity-90 hover:scale-95 transition-all duration-200 ease-in-out"
          onClick={() => onSquareClick(index)}  
        >
          {square}
        </div>
      ):
      (
        <div
          key={index}
          className="w-20 h-20 flex items-center justify-center border-2 border-white text-xl text-white font-bold cursor-pointer hover:bg-red-400 hover:border-black  hover:opacity-90 hover:scale-95 transition-all duration-200 ease-in-out"
          onClick={() => onSquareClick(index)}  
        >
          {square}
        </div>
      )
      )}
    </div>
  );
};

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSquareClick: PropTypes.func.isRequired,
};

export default GameBoard;
