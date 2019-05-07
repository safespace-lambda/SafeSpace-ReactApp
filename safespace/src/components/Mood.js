import React, { Component } from 'react';

export default class Mood extends Component {
  render() {
    return (
      <div className='mood'>
        <h2>What are you feeling today?</h2>
        <button onClick={this.props.depression}>Depression</button>
        <button onClick={this.props.anxiety}>Anxiety</button>
        <button onClick={this.props.anger}>Anger</button>
      </div>
    )
  }
}
