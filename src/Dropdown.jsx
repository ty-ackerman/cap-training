import React, {Component} from "react"
import "./dropdown_styles.css"

// TODOS:
// 1. Read the ref related code again, understand it.
//  DONE 2. Enchance this dd func a little : if i select "bulbasaur", the plceholder should be replaced with the chosen value and the dd-closes (tricky!!!)
// 3. accessibility : keyboard ( TAB -> FOCUS, ARROW KEY NAVIAGTION, ESC -> Closes, ENTER-> Selects and does step 2)
// 4. DONE CSS -> outline shadow, transperant, hover an item, change its color, when the dd is open, the border changes color to show its open
// 5. gist/github repo for debugging/helps

const arrow = require("./down-arrow.png")
const ddItems = [
    { id: 1, name: "Bulbasaur", level: "grass" },
    { id: 2, name: "Squirtle", level: "water" },
    { id: 3, name: "Charmander", level: "fire" }
  ];

class Dropdown extends Component {
    constructor() {
        super()
        this.state =  {
            displayDD: false,
            selectedText: "Select a Character"
        }
    }

    openDD = () => {
        this.setState({displayDD: true})
        //When clicked, add an event listener that keeps track of the close function
        document.addEventListener("click", this.closeDD)
        //Problem = dow the entire document has this closeDD function, therefore we are unable to open the dd again.
        //Solution = check closeDD to REMOVE the closeDD
    }


    closeDD = event => {
        //event.target = whatever node has been clicked
        //here we are checking to see if anything EXCEPT the actual li has been clicked
        //we are doing this by seeing if the node item being clicked matches what is stored in this.dropdownRef
        if (!this.dropdownRef.contains(event.target)) {
            //If it doesn't match (i.e. anything other than the li was clicked), displayList should close
           this.setState({displayDD: false})
           document.removeEventListener("click", this.closeDD)
        }
    }

    getText = event => {
        this.setState({selectedText: event.target.textContent})
        this.setState({displayDD: false})
        document.removeEventListener("click", this.closeDD)
    }

    changeClass = (nodeText, selected) => {
        if (nodeText === selected) {
            return "dd-item selected"
        }
        return "dd-item"

    }

    renderItems = () => {
        if (this.state.displayDD) {
            return (
                //This next ref is adding a node to dropdownRef key/value pairing within this (scope is the dropdown class so it's accessible in other functions)
                <ul ref = {node =>{ 
                    this.dropdownRef = node}}>
                    {ddItems.map(item => {
                        return (
                        <li 
                            onClick={this.getText} 
                            ref = {
                                node => (node ? (
                                    node.className = this.changeClass(node.textContent, this.state.selectedText)) : null)
                            }  
                            key={item.id}>
                                {item.name}
                    </li>
                    )
                    })}
                </ul>
            )
        }   
    }

    render() {
        const {displayDD, selectedText} = this.state
        const iconState = displayDD ? "dd-open" : "dd-closed"
        return (
            <div className = "wrapper">
                <div className={`dd-container ${iconState}`} onClick={this.openDD}>
                    <div className="select">{selectedText}</div>
                    <div className="image-container">
                        <img className={iconState} src={arrow} alt="toggle arrow"/>
                    </div>
                </div>
                {this.renderItems()}
            </div>
        )
    }
}

export default Dropdown