import React from 'react'
import scroll from '../assets/scroll.jpg';

class Message extends React.Component {

  render() {
    return (
      <div className='message'>
        <img className='scroll' src={scroll} alt='message_img'/>
        <p>{this.props.message.body}</p>
        <button onClick={() => this.props.modify(this.props.message)}>Modify</button>
        <button onClick={() => this.props.delete(this.props.message)}>Delete</button>
      </div>
    )
  }
}

export default Message;
