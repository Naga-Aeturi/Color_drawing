import { ACTIONS } from "./constants.js";

let undoArray = [];
let redoArray = [];
export const reducer=(state, action) =>{
  switch (action.type) {
    case ACTIONS.COLOR_SELECTION:
      return {
        ...state,selectedColor:action.changedColor
      };

    case ACTIONS.CLICK: {
      if (redoArray.length !== 0) {
        redoArray = [];
      }
      let newCellColors = [...state.cellColors];
      undoArray.push(state.cellColors);
      newCellColors[action.index] = state.selectedColor;
      localStorage.setItem(ACTIONS.SAVEDCOLORS, JSON.stringify(newCellColors));
      return { ...state, cellColors: newCellColors };
    }

    case ACTIONS.RESET: {
      undoArray = [];
      redoArray = [];
      localStorage.setItem(
        ACTIONS.SAVEDCOLORS,
        JSON.stringify(Array(256).fill("#FFFFFF"))
      );
      return {
        ...state,
        cellColors: Array(256).fill("#FFFFFF"),
      };
    }

    case ACTIONS.UNDO: {
      if (undoArray.length > 0) {
        redoArray.push(state.cellColors);
        let past = undoArray.pop();
        localStorage.setItem(ACTIONS.SAVEDCOLORS, JSON.stringify(past));
        return { ...state, cellColors: past };
      }
      return state;
    }

    case ACTIONS.REDO: {
      if (redoArray.length > 0) {
        undoArray.push(state.cellColors);
        let next = redoArray.pop();
        localStorage.setItem(ACTIONS.SAVEDCOLORS, JSON.stringify(next));
        return { ...state, cellColors: next };
      }
      return state;
    }

    default:
      return state;
  }
}
