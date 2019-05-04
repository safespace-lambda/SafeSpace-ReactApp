import React, { Component } from 'react'
import SendSMS from './SendSMS';


export default class Quote extends Component {

    state = {
        smsFlag : false
    }

  smsToggle = () => {
    this.setState({
      smsFlag : !this.state.smsFlag  
    }) 
  }

  render() {
    return (    
        <div className='quote'>
            <p>{this.props.quote.body}</p>
            <button onClick={this.smsToggle}>Send SMS</button>
            {this.state.smsFlag && <SendSMS sms={this.props.sms} quote={this.props.quote} smsToggle={this.smsToggle}/>}
        </div>
    )
  }
}
