import React from "react";

import classes from "./App.module.css";

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
      done: true,
    };
  }
  numberText = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "C"];
  operatorText = ["+", "-", "*", "/", "="];

  onNumberClick = number => {
    this.setState(({ currentOutput, done }) => {
      if (number === ".") {
        if (!currentOutput.includes("."))
          return {
            currentOutput: currentOutput + number,
            done: true
          };
        return;
      }
      if (number === "C") {
        return {
          currentOutput:
            currentOutput.length === 1
              ? "0"
              : currentOutput.substring(0, currentOutput.length - 1),
              done: true
        };
      }
      return {
        currentOutput: currentOutput === "0" ? number : currentOutput + number,
        done
      };
    });
  };

  onOperatorClick = operator => {
    this.setState(state => {
      const { currentOutput, operator: prevOperator, prevOutput } = state;
      if (prevOperator && prevOutput) {
        return {
          currentOutput: this.evaluate(state),
          operator,
          done: true,
        };
      } else {
        return {
          prevOutput: currentOutput,
          currentOutput: "",
          operator,
          done: false
        };
      }
    });
  };

  evaluate({ currentOutput, prevOutput, operator }) {
    switch (operator) {
      case "+":
        return +prevOutput + +currentOutput;
      case "-":
        return +prevOutput - +currentOutput;
      case "*":
        return +prevOutput * +currentOutput;
      case "/":
        return +prevOutput / +currentOutput;
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
    // const blink = this.state.blink;
    // const {style} = blink === true ? '0.5' : null
    return (
      <div className={classes.app}>
        <Display value={this.state.currentOutput || this.state.prevOutput} />
        <div className={classes.buttonContainer}>
          <div className={classes.numberUtilContainer}>
            <Button className={classes.resetButton} title={"RESET"} onClick={this.reset} />
            <ButtonList
              // style={{opacity: style}}
              className={classes.numberButtonContainer}
              buttons={this.numberText}
              onButtonClick={this.onNumberClick}
            />
          </div>
          <ButtonList
            className={classes.operatorButtonContainer}
            buttons={this.operatorText}
            onButtonClick={this.onOperatorClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
