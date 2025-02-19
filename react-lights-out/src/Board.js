import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({ length : nrows }, ()=>
    Array.from({ length : ncols }, ()=> Math.random() < chanceLightStartsOn));
    // TODO: create array-of-arrays of true/false values
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x);
      flipCell(y + 1, x);
      flipCell(y - 1, x);
      flipCell(y, x + 1);
      flipCell(y, x - 1);

      console.log(`Flipping cell at (${y}, ${x})`);
      console.log(`Board size: ${nrows}x${ncols}`);


      return boardCopy;

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()){
    return (
        <div className="Board-win">You Win!</div>
    );
  }

  // TODO

  // make table board

    return (
        <table className="Board">
          <tbody>
            {board.map((row, y)=> (
                <tr key={y}>
                    {row.map((cell, x)=> (
                        <Cell
                            key={`${y}-${x}`}
                            isLit={cell}
                            flipCellsAroundMe={()=> flipCellsAround(`${y}-${x}`)}
                        />
                    ))}
                </tr>
            ))}
          </tbody>
        </table>
    );
  

  // TODO
}

export default Board;
