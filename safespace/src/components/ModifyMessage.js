import React, { Component } from 'react'

export default class ModifyMessage extends Component {
  render() {
    //previously in the onSubmit arrowFunction.  this.props.add(e.target[0].value)
    return (
        <form onSubmit={ (e) => {e.preventDefault(); console.log('modify message submitted')} }>
        <textarea name='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
        <button>Submit</button>
    </form>
    )
  }
}
