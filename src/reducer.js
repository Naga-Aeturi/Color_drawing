import { ACTIONS } from "./constants.js";

export const reducer=(state, action) =>{
  switch (action.type) {
    case ACTIONS.COLOR_SELECTION:
      return {
        ...state,selectedColor:action.changedColor
      };

    case ACTIONS.CLICK: {
      let newCellColors = [...state.cellColors];
      let newUndoRedoArray=state.undoRedoArray.slice(0,state.currentIndexInArray+1);
      newCellColors[action.index] = state.selectedColor;
      newUndoRedoArray.push(newCellColors);
      localStorage.setItem(ACTIONS.SAVEDCOLORS, JSON.stringify(newCellColors));
      return { ...state, cellColors: newCellColors,undoRedoArray:newUndoRedoArray,currentIndexInArray:state.currentIndexInArray+1 };
    }

    case ACTIONS.RESET: {
      localStorage.setItem(
        ACTIONS.SAVEDCOLORS,
        JSON.stringify(Array(256).fill("#FFFFFF"))
      );
      return {
        ...state,
        cellColors: Array(256).fill("#FFFFFF"),undoRedoArray:[Array(256).fill("#FFFFFF")],currentIndexInArray:0
      };
    }

    case ACTIONS.UNDO: {
      if (state.currentIndexInArray > 0) {
        localStorage.setItem(ACTIONS.SAVEDCOLORS, JSON.stringify(state.undoRedoArray[state.currentIndexInArray-1]));
        return { ...state, cellColors: state.undoRedoArray[state.currentIndexInArray-1],currentIndexInArray:state.currentIndexInArray-1 };
      }
      return state;
    }

    case ACTIONS.REDO: {
      if (state.currentIndexInArray<state.undoRedoArray.length-1) {
        localStorage.setItem(ACTIONS.SAVEDCOLORS, JSON.stringify(state.undoRedoArray[state.currentIndexInArray+1]));
        return { ...state, cellColors: state.undoRedoArray[state.currentIndexInArray+1] ,currentIndexInArray:state.currentIndexInArray+1 };
      }
      return state;
    }

    default:
      return state;
  }
}
