import "./../styles.css";

import React, { useReducer, useCallback } from "react";
import { CirclePicker } from "react-color";

import {Grid} from "./Grid.js";

import {reducer} from "../reducer.js";
import {ACTIONS} from "../constants.js";

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    selectedColor: "white",
    cellColors:
      JSON.parse(localStorage.getItem(ACTIONS.SAVEDCOLORS)) ??
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
    <div className="bodyContainer">
      <div>
        <h1 className="title">Color-Padding</h1>
      </div>
      <div className="colorSelector">
        <CirclePicker className="grid" onChange={handleColorSelection} />
      </div>
      <div className="gridWrapper">
          <Grid
            cellColors={state.cellColors}
            onCellClick={handleClick}
            selectedColor={state.selectedColor}
            />
      </div>
      <div className="button">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
    </div>
  );
}
