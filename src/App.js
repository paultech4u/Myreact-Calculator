import React from "react";

import Display from "./Display/Display";
import ButtonList from "./components/ButtonList";
import Button from "./components/Button/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOutput: "0",
      prevOutput: "",
      operator: "",
      done: true
    };
  }
  numberText = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "C"];
  operatorText = ["+", "-", "*", "/", "="];

  onNumberClick = number => {
    this.setState(({ currentOutput }) => {
      if (number === ".") {
        if (!currentOutput.includes("."))
          return { currentOutput: currentOutput + number };
        return;
      }
      if (number === "C") {
        return {
          currentOutput:
            currentOutput.length === 1
              ? "0"
              : currentOutput.substring(0, currentOutput.length - 1)
        };
      }
      return {
        currentOutput:
          currentOutput === "0" ? number : currentOutput + number
      };
    });
  };

  onOperatorClick = operator => {
    this.setState(state => {
      const { currentOutput, operator: prevOperator, prevOutput } = state;
      if (prevOperator && prevOutput) {
        return {
          currentOutput: this.evaluate(state),
          operator
        };
      }else{
        return {
          prevOutput: currentOutput,
          currentOutput: '',
          operator
        };
      }
    });
  };

  evaluate({ currentOutput, prevOutput, operator }) {
    switch (operator) {
      case "+":
        return (+prevOutput + +currentOutput);
      case "-":
        return (+prevOutput - +currentOutput);
      case "*":
        return (+prevOutput * +currentOutput);
      case "/":
        return (+prevOutput / +currentOutput);
      default:
        break;
    }
  }

  reset = () => {
    this.setState({
      currentOutput: "0",
      prevOutput: "",
      operator: "",
      done: true
    });
  };

  render() {
    console.log(!this.state.prevOutput);
    return (
      <div className="app">
        <Display value={this.state.currentOutput || this.state.prevOutput} />
        <div className="button-container">
          <Button title={"RESET"} onClick={this.reset} />
          <ButtonList
            buttons={this.numberText}
            onButtonClick={this.onNumberClick}
          />
          <ButtonList
            buttons={this.operatorText}
            onButtonClick={this.onOperatorClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
