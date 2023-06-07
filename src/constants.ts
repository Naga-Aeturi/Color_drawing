export const ACTIONS = {
  COLOR_SELECTION: "handleColorSelection",
  CLICK: "handleClick",
  RESET: "handleReset",
  REDO: "handleRedo",
  UNDO: "handleUndo",
}


export const LOCAL_STORAGE_KEY = "SavedColors"
export const DEFAULT_COLOR_ARRAY:Array<string>=Array(256).fill("#FFFFFF")