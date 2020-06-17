import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HexagonPuzzle from "./components/HexagonPuzzle";

function App() {
  return (
    <>
      <div className="background-container"></div>
      <div className="content-container">
        <HexagonPuzzle />
      </div>
    </>
  );
}

export default App;
