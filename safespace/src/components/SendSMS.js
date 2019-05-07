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

      duration = (e,time) => {
        const currentHours = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const pieces = time.split(':');
        const targetHours = parseInt(pieces[0],10);
        const targetMinutes = parseInt(pieces[1],10);
        const durationHours = targetHours - currentHours;
        const durationMinutes = targetMinutes - currentMinutes;
        const duration = durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000
        return duration;
      }

    render() {
   
    return (
      <form onSubmit={ (e) => {
        e.preventDefault(); 
        this.props.smsToggle(); 
        const duration = this.duration(e,this.state.time);
        console.log(duration, 'duration returned from duration()');
        setTimeout(this.props.sms,duration, this.props.quote,'+14694143109',this.state.phone);
        // this.props.sms(this.props.quote,'+14694143109',this.state.phone);
        }}>
        <input type='time' name='time' value={this.state.time} onChange={this.handleChange}/>
        <input type='text' name='phone' value={this.state.phone} onChange={this.handleChange} required />
        <button>Schedule</button>
      </form>
    )
  }
}
