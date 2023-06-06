import { memo, useCallback, useState, useEffect } from "react";

export const Grid = ({
  cellColors,
  onCellClick: _onCellClick,
  selectedColor,
}) => {
  let result = cellColors.map((color, index) => {
    const onCellClick = useCallback(
      () => _onCellClick(index),
      [index, _onCellClick]
    );
    return (
      <Cell
        key={index}
        id={index}
        color={color}
        onCellClick={onCellClick}
        selectedColor={selectedColor}
      />
    );
  });
  return result;
};

export const Cell = memo(({ color, onCellClick, selectedColor }) => {
  const [bgColor, setbgColor] = useState(color);
  useEffect(() => {
    setbgColor(color);
  }, [color]);
  
  return (
    <div
      className="cell"
      style={{ backgroundColor: bgColor }}
      onClick={onCellClick}
      onMouseEnter={() => {
        setbgColor(selectedColor);
      }}
      onMouseLeave={() => {
        setbgColor(color);
      }}
    />
  );
});
