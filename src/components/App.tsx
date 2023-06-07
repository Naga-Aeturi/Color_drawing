import React, { useReducer, useCallback } from "react";
import { CirclePicker } from "react-color";

import { Grid } from "./Grid";

import { reducer } from "../reducer";
import { ACTIONS, LOCAL_STORAGE_KEY, DEFAULT_COLOR_ARRAY } from "../constants";
import { State } from "../types";

import "./../styles.css";

export const App = () => {
  let loadedCellColors: Array<string>;
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    loadedCellColors = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]"
    );
  } else {
    loadedCellColors = DEFAULT_COLOR_ARRAY;
  }
  const initialState: State = {
    undoRedoArray: [loadedCellColors],
    currentIndex: 0,
    selectedColor: "white",
    cellColors: loadedCellColors,
  };
  interface selectColortype {
    hex: string;
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleColorSelection = useCallback(
    (color: selectColortype) => {
      dispatch({ type: ACTIONS.COLOR_SELECTION, changedColor: color.hex });
    },
    [dispatch]
  );

  const handleClick = useCallback(
    (index: number) => {
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
        <CirclePicker onChange={handleColorSelection} />
      </div>
      <div className="boarder">
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
};
