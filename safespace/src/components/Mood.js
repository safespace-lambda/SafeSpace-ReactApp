import React, { Component } from 'react'

export default class Mood extends Component {
  render() {
    return (
      <div className='mood'>
        <h2>What are you feeling today?</h2>
        <button onClick={this.props.depression}>Depression</button>
        <button>Anxiety</button>
        <button>Sadness</button>
        <button>Anger</button>
      </div>
    )
  }
}
