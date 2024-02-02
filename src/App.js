import React, { useState, useEffect } from 'react';
import './main.css';

function App() {
  const startPlayer = "X"
  const [turnPlayer, setTurnPlayer] = useState(startPlayer);
  const nextPlayer = (turnPlayer === "X") ? "O" : "X";
  const [gameWinner, setGameWinner] = useState(null);
  const [fullGrid, setFullGrid] = useState(false);
  const [tie, setTie] = useState(false);
  const startingBoxes = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  }
  const [boxes, setBoxes] = useState(startingBoxes);

  const gameRows = {
    rowOne: [boxes[1], boxes[2], boxes[3]],
    rowTwo: [boxes[4], boxes[5], boxes[6]],
    rowThree: [boxes[7], boxes[8], boxes[9]],
  };

  const gameState = {
    ...gameRows,
    ColOne: [gameRows.rowOne[0], gameRows.rowTwo[0], gameRows.rowThree[0]],
    ColTwo: [gameRows.rowOne[1], gameRows.rowTwo[1], gameRows.rowThree[1]],
    ColThree: [gameRows.rowOne[2], gameRows.rowTwo[2], gameRows.rowThree[2]],
    diagOne: [gameRows.rowOne[0], gameRows.rowTwo[1], gameRows.rowThree[2]],
    diagTwo: [gameRows.rowThree[0], gameRows.rowTwo[1], gameRows.rowOne[2]],
  }
  const [game, setGame] = useState({});

  const handleClick = (event) => {
    event.preventDefault();
    const id = event.target.id;
    console.log(id)
    const newBox = {
      ...boxes,
      [id]: turnPlayer
    }
    if (boxes[id] === null && !gameWinner) {
      setBoxes(() => newBox);
      setTurnPlayer(() => nextPlayer)
    }
  }

  useEffect(() => {
    setGame(() => gameState);
    for (const row in gameState) {
      (gameState[row].every((box) => box === nextPlayer)) && setGameWinner(() => nextPlayer);
    }
    setFullGrid(() => true);
    for (const box in boxes) {
      if (boxes[box] === null) {
        setFullGrid(() => false);
      }
    }
    console.log("fullGrid " + fullGrid);
  }, [boxes])

  useEffect(() => {
    if (gameWinner === null && fullGrid === true) {
      setTie(() => true);
    }
  }, [fullGrid, tie])

  const resetGame = () => {
    setBoxes(() => startingBoxes);
    setGameWinner(() => null);
    setTurnPlayer(() => startPlayer);
    setTie(() => false);
  }

  return (
    <>
      <div id="article">
        <h1>Tic-Tac-Toe!</h1>
        <div>
          <div>
            {(gameWinner === "Tie") && <h3 className="status">Tie</h3>}
            {(gameWinner !== null) && <h3 className="status">Winner: {gameWinner}</h3>}
            {(gameWinner === null) && <h3 className="status">Next player: {turnPlayer}</h3>}
          </div>
          <button className="reset" onClick={() => resetGame()}>{(gameWinner) ? "New Game?" : "Reset"}</button>
        </div>
        <div className="gameGrid container-fluid d-flex flex-column text-center">
          <div className="row">
            <div id={1} className="col-4 square border-primary border-bottom border-end p-4" onClick={(event) => handleClick(event)}>
              {(boxes[1]) ? <p id={1} className="square marker">{game.rowOne[0]}</p> : <p id={1} className="square marker"></p>}
            </div>
            <div id={2} className="col-4 square border-primary border-start border-bottom border-end p-4" onClick={(event) => handleClick(event)}>
              {(boxes[2]) ? <p id={2} className="square marker">{game.rowOne[1]}</p> : <p id={2} className="square marker"></p>}
            </div>
            <div id={3} className="col-4 square border-primary border-start border-bottom p-4" onClick={(event) => handleClick(event)}>
              {(boxes[3]) ? <p id={3} className="square marker">{game.rowOne[2]}</p> : <p id={3} className="square marker"></p>}
            </div>
          </div>
          <div className="row">
            <div id={4} className="col-4 square border-primary border-top border-bottom border-end p-4" onClick={(event) => handleClick(event)}>
              {(boxes[4]) ? <p id={4} className="square marker">{game.rowTwo[0]}</p> : <p id={4} className="square marker"></p>}
            </div>
            <div id={5} className="col-4 square border-primary border p-4" onClick={(event) => handleClick(event)}>
              {(boxes[5]) ? <p id={5} className="square marker">{game.rowTwo[1]}</p> : <p id={5} className="square marker" ></p>}
            </div>
            <div id={6} className="col-4 square border-primary border-start border-top border-bottom p-4" onClick={(event) => handleClick(event)}>
              {(boxes[6]) ? <p id={6} className="square marker">{game.rowTwo[2]}</p> : <p id={6} className="square marker"></p>}
            </div>
          </div>
          <div className="row">
            <div id={7} className="col-4 square border-primary border-top border-end p-4" onClick={(event) => handleClick(event)}>
              {(boxes[7]) ? <p id={7} className="square marker">{game.rowThree[0]}</p> : <p id={7} className="square marker"></p>}
            </div>
            <div id={8} className="col-4 square border-primary border-start border-top border-end p-4" onClick={(event) => handleClick(event)}>
              {(boxes[8]) ? <p id={8} className="square marker">{game.rowThree[1]}</p> : <p id={8} className="square marker"></p>}
            </div>
            <div id={9} className="col-4 square border-primary border-start border-top p-4" onClick={(event) => handleClick(event)}>
              {(boxes[9]) ? <p id={9} className="square marker">{game.rowThree[2]}</p> : <p id={9} className="square marker"></p>}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default App