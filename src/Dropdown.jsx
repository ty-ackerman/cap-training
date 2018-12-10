// TODOS:
// 1. Read the ref related code again, understand it.
// 2. Enchance this dd func a little : if i select "bulbasaur", the plceholder should be replaced with the chosen value and the dd-closes (tricky!!!)
// 3. accessibility : keyboard ( TAB -> FOCUS, ARROW KEY NAVIAGTION, ESC -> Closes, ENTER-> Selects and does step 2)
// 4. CSS -> outline shadow, transperant, hover an item, change its color, when the dd is open, the border changes color to show its open
// 5. gist/github repo for debugging/helps

import React, { Component } from "react";
import "./dropdown_styles.css";
const downArrowImage = require("./down-arrow.png");

const ddItems = [
  { id: 1, name: "Bulbasaur", level: "grass" },
  { id: 2, name: "Squirtle", level: "water" },
  { id: 3, name: "Charmander", level: "fire" }
];

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      displayList: false
    };
  }

  //   showDropdown = () => {
  //     this.setState({ displayList: !this.state.displayList });
  //   };

  showDropdown = () => {
    this.setState({ displayList: true });
    // when i click on the button and the dropdown is open : add a event listener that keeps track of the close fn => when to invoke the close fn?
    document.addEventListener("click", this.hideDropdown);
  };

  hideDropdown = event => {
    if (!this.dropdownRef.contains(event.target)) {
      this.setState({ displayList: false });
    }
    document.removeEventListener("click", this.hideDropdown);
  };

  showDropdownItems = () => {
    // this.state.displayList ? <render something> : null
    // <div id="my_id" />
    // document.getElementById('my_id').currentValue('something')
    if (this.state.displayList) {
      return (
        <ul className="list-container" ref={node => (this.dropdownRef = node)}>
          {ddItems.map(item => {
            return (
              <li className="list-item" key={item.id}>
                {item.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  };

  render() {
    // on clicking outside the dropdown, it closes! Anywhere inside it, it stays open
    // refs are used to identify DOM nodes => if my ref can identify the area of the dd items div
    const { displayList } = this.state;
    const iconState = displayList ? "dd-icon-open" : "dd-icon-closed";
    return (
      <div>
        <div className="dd-wrapper" onClick={this.showDropdown}>
          <div className="title">Select a Character</div>
          <div className="image">
            <img
              className={iconState}
              src={downArrowImage}
              alt="toggle arrow"
            />
          </div>
        </div>
        {this.showDropdownItems()}
      </div>
    );
  }
}

export default Dropdown;
