import { ACTIONS,LOCAL_STORAGE_KEY,DEFAULT_COLOR_ARRAY } from "./constants.js";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.COLOR_SELECTION:
      return {
        ...state,
        selectedColor: action.changedColor,
      };

    case ACTIONS.CLICK: {
      let newCellColors = [...state.cellColors];
      let newUndoRedoArray = state.undoRedoArray.slice(
        0,
        state.currentIndex + 1
      );
      newCellColors[action.index] = state.selectedColor;
      newUndoRedoArray.push(newCellColors);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCellColors));
      return {
        ...state,
        cellColors: newCellColors,
        undoRedoArray: newUndoRedoArray,
        currentIndex: state.currentIndex + 1,
      };
    }

    case ACTIONS.RESET: {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(DEFAULT_COLOR_ARRAY)
      );
      return {
        ...state,
        cellColors: DEFAULT_COLOR_ARRAY,
        undoRedoArray: [DEFAULT_COLOR_ARRAY],
        currentIndex: 0,
      };
    }

    case ACTIONS.UNDO: {
      if (state.currentIndex > 0) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.undoRedoArray[state.currentIndex - 1])
        );
        return {
          ...state,
          cellColors: state.undoRedoArray[state.currentIndex - 1],
          currentIndex: state.currentIndex - 1,
        };
      }
      return state;
    }

    case ACTIONS.REDO: {
      if (state.currentIndex < state.undoRedoArray.length - 1) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.undoRedoArray[state.currentIndex + 1])
        );
        return {
          ...state,
          cellColors: state.undoRedoArray[state.currentIndex + 1],
          currentIndex: state.currentIndex + 1,
        };
      }
      return state;
    }

    default:
      return state;
  }
};
