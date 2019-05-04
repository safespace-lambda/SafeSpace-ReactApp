import React, { Component } from 'react'

export default class SendSMS extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time : '',
            phone : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

  render() {
    return (
      <form onSubmit={(e) => {e.preventDefault(); this.props.smsToggle(); this.props.sms(this.props.quote,'+14694143109',this.state.phone)}}>
        <input type='time' name='time' value={this.state.time} onChange={this.handleChange}/>
        <input type='text' name='phone' value={this.state.phone} onChange={this.handleChange} required />
        <button>Schedule</button>
      </form>
    )
  }
}
