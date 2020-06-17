import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HexagonPuzzle from "./components/HexagonPuzzle";

function App() {
  return (
    <>
      <div className="background-container"></div>
      <div className="content-container">
        <h1 id="puzzle-title">
          Circus Seven Puzzle <span id="title-underline"></span>
        </h1>

        <div className="puzzle-info">
          <div className="info-title">What is this?</div>
          <div className="info-body">
            Circus Seven is a puzzle consisting of seven large hexagonal nuts,
            each piece has six colours, and there is a perfect correspondence
            with the colors of the puzzle.
          </div>
        </div>
        <HexagonPuzzle />
      </div>
    </>
  );
}

export default App;
