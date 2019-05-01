import React, { Component } from 'react'

export default class ModifyMessage extends Component {
    constructor(props) {
        super(props);
    }

  modMsg = (e) => {
    e.preventDefault();
    console.log(e.target[0].value, 'e.target[0].value');

        const modMessage = {
            ...this.props.message,
            body : e.target[0].value
        } 

    this.props.modify(modMessage);
    this.props.toggleMod();
  }
  
  render() {
    //previously in the onSubmit arrowFunction.  this.props.add(e.target[0].value)
    return (
        <form onSubmit={ (e) => this.modMsg(e)}>
            <textarea name='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
            <button>Submit</button>
            {/* <button onClick={this.submitMod}>Submit</button> */}
        </form>
    )
  }
}
