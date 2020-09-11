import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

let screenSize= window.innerWidth < 500;
console.log(window)

ReactDOM.render(<App small={screenSize ? 'true' : undefined}/>, document.getElementById("root"));