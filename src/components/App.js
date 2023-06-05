import "./../styles.css";
import React, { useReducer, useCallback } from "react";
import { CirclePicker } from "react-color";
import handleReducer from "../reducerAction.js";
import Container from "./Container.js";
import {ACTIONS} from "../Constants.js";
export default function App() {
  const [state, dispatch] = useReducer(handleReducer, {
    selectedColor: "white",
    squareColors:
      JSON.parse(localStorage.getItem("SavedColors")) ??
      Array(256).fill("#FFFFFF"),
  });

  const handleColorSelection = useCallback(
    (colorName) => {
      dispatch({ type: ACTIONS.COLOR_SELECTION, changedColor: colorName.hex });
    },
    [dispatch]
  );

  const handleClick = useCallback(
    (index) => {
      dispatch({ type: ACTIONS.CLICK, index });
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, [dispatch]);

  const handleUndo = useCallback(() => {
    dispatch({ type: ACTIONS.UNDO });
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch({ type: ACTIONS.REDO });
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
