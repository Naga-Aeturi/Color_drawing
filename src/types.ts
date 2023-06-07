import {ACTIONS} from "./constants";

export type State ={
    undoRedoArray: Array<Array<string>>;
    currentIndex: number;
    selectedColor: string;
    cellColors: Array<string>;
}

type ValueOf<T> =T[keyof T];

export type Action={
    type:ValueOf<keyof typeof ACTIONS>;
    changedColor?:string;
    index?:number
}

export type GridProps={
    cellColors:Array<string>,
    onCellClick:Function,
    selectedColor:string
}

export type CellProps={
    color:string,
    onCellClick:Function,
    selectedColor:string
}
