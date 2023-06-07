import React from "react";
import { memo, useCallback, useState, useEffect } from "react";

import "./../styles.css";

import { GridProps,CellProps } from "src/types";

export const Grid = ({cellColors,onCellClick,selectedColor}:GridProps) => {
  let result = cellColors.map((color, index) => {
    const onClick = useCallback(
      () => onCellClick(index),[index,onCellClick]);
    return (
      <Cell
        key={index}
        color={color}
        onCellClick={onClick}
        selectedColor={selectedColor}
      />
    );
  });
  return (
    <div className="gridWrapper">
    {result}
    </div>
    );
};

export const Cell = memo(({ color, onCellClick, selectedColor}:CellProps) => {
  const [bgColor, setBgColor] = useState(color);
  useEffect(() => {
    setBgColor(color);
  }, [color]);
  const onMouseEnter=useCallback(()=>setBgColor(selectedColor),[selectedColor]);
  const onMouseLeave=useCallback(()=>setBgColor(color),[color]);
  return (
    <div
      className="cell"
      style={{ backgroundColor: bgColor }}
      onClick={() => onCellClick()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
});
