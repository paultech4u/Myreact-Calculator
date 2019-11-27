import React from "react";
import Button from "./Button/Button";

function ButtonList(props) {
  return (
    <div>
      {props.buttons.map(number => (
        <Button key={number} title={number} onClick={() => props.onButtonClick(number)} />
      ))}
    </div>
  );
}

export default ButtonList