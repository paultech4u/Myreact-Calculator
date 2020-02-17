import React from "react";
import React from "react";
import Button from "./Button/Button";

function ButtonList(props) {
  return (
    <div className={props.className}>
      {props.buttons.map(number => (
        <Button  key={number} title={number} onClick={() => props.onButtonClick(number)} />
      ))}
    </div>
  );
}

export default ButtonList