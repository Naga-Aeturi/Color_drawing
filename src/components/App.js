import "./../styles.css";
import React, { useReducer, useCallback } from "react";
import { CirclePicker } from "react-color";
import handleReducer from "../handleReducer.js";
import Container from "./Container.js";
import {COLORSELECTION,CLICK,RESET,REDO,UNDO} from "../Constants.js";
export default function App() {
  const [state, dispatch] = useReducer(handleReducer, {
    selectedColor: "white",
    squareColors:
      JSON.parse(localStorage.getItem("SavedColors")) ??
      Array(256).fill("#FFFFFF"),
  });

  const handleColorSelection = useCallback(
    (colorName) => {
      dispatch({ type: COLORSELECTION, changedColor: colorName.hex });
    },
    [dispatch]
  );

  const handleClick = useCallback(
    (index) => {
      dispatch({ type: CLICK, index });
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: RESET });
  }, [dispatch]);

  const handleUndo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch({ type: REDO });
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <h1 className="titleStyle">Color-Padding</h1>
      </div>
      <div className="div2">
        <CirclePicker className="gridStyle" onChange={handleColorSelection} />
      </div>
      <div className="gridWrapperStyle">
        <div className="containerStyle">
          <Container
            squareColors={state.squareColors}
            onSquareClick={handleClick}
            selectedColor={state.selectedColor}
          />
        </div>
      </div>
      <div className="buttonStyle">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
    </div>
  );
}
