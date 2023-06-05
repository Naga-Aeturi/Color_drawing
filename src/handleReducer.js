import {COLORSELECTION,CLICK,RESET,REDO,UNDO} from "./Constants.js"
let undoArray = [];
let redoArray = [];
export default function handleReducer(state, action) {
  switch (action.type) {
    case COLORSELECTION:
      return {
        selectedColor: action.changedColor,
        squareColors: state.squareColors,
      };

    case CLICK: {
      if (redoArray.length !== 0) {
        redoArray = [];
      }
      let newSquareColors = [...state.squareColors];
      undoArray.push(state.squareColors);
      newSquareColors[action.index] = state.selectedColor;
      localStorage.setItem("SavedColors", JSON.stringify(newSquareColors));
      return { selectedColor: state.selectedColor, squareColors: newSquareColors };
    }

    case RESET: {
      undoArray = [];
      redoArray = [];
      localStorage.setItem(
        "SavedColors",
        JSON.stringify(Array(256).fill("#FFFFFF"))
      );
      return {
        selectedColor: state.selectedColor,
        squareColors: Array(256).fill("#FFFFFF"),
      };
    }

    case UNDO: {
      if (undoArray.length > 0) {
        redoArray.push(state.squareColors);
        let past = undoArray.pop();
        localStorage.setItem("SavedColors", JSON.stringify(past));
        return { selectedColor: state.selectedColor, squareColors: past };
      }
      return state;
    }

    case REDO: {
      if (redoArray.length > 0) {
        undoArray.push(state.squareColors);
        let next = redoArray.pop();
        localStorage.setItem("SavedColors", JSON.stringify(next));
        return { selectedColor: state.selectedColor, squareColors: next };
      }
      return state;
    }

    default:
      return state;
  }
}
