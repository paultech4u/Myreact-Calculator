import React from "react";
// import style from './Button.module.css'

function Button(props) {
  return (
    <div>
      <button {...props}>{props.title}</button>
    </div>
  );
}

export default Button;
