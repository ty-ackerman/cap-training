import React, { Component } from "react";
import "./App.css";
import Dropdown from "./Dropdown";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Dropdown Menu</h1>
        <Dropdown />
      </div>
    );
  }
}

export default App;
