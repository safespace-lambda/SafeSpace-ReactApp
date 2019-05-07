import React, { Component } from 'react'

export default class ModifyMessage extends Component {
  
  modMsg = (e) => {
    e.preventDefault();
    console.log(e.target[2].value, 'e.target[2].value');
    
    const modMessage = {
        ...this.props.message,  
        body : e.target[0].value,
        // scheduled : e.target[1].value
        scheduled : new Date()
    } 

    this.props.modify(modMessage,e.target[2].value);
    this.props.toggleMod();
  }
  
  render() {
    //previously in the onSubmit arrowFunction.  this.props.add(e.target[0].value)
    return (
        <form onSubmit={ (e) => this.modMsg(e)}>
            <textarea id='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
            <button>Submit</button>
            <input type='time' id='time' placeholder='time'/>
            {/* <button onClick={this.submitMod}>Submit</button> */}
        </form>
    )
  }
}
