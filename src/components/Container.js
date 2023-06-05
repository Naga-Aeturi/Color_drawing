import { memo, useCallback, useState, useEffect } from "react";
import useWhyDidYouUpdate from "../hooks/useWhyDidYouUpdate.js";
export default function Container({
  squareColors,
  onSquareClick: _onSquareClick,
  selectedColor,
}) {
  let result = squareColors.map((color, index) => {
    const onSquareClick = useCallback(() => _onSquareClick(index),[index, _onSquareClick])

    return (
      <Square
        key={index}
        id={index}
        color={color}
        onSquareClick={onSquareClick}
        selectedColor={selectedColor}
      />
    );
  });
  return result;
}
let count = 0;
export const Square = memo(({id, color, onSquareClick, selectedColor }) => {
  useWhyDidYouUpdate(Square,{id, color, onSquareClick, selectedColor });
  const [bgColor, setbgColor] = useState(color);
  useEffect(() => {
    setbgColor(color);
  }, [color]);

    console.log(`rendereing ${id}`);
  return (
    <div
      className="squareStyle"
      style={{ backgroundColor: bgColor }}
      onClick={onSquareClick}
      onMouseEnter={() => {
        setbgColor(selectedColor);
      }}
      onMouseLeave={() => {
        setbgColor(color);
      }}
    />
  );
});
