import React from 'react'
import scroll from '../assets/scroll.jpg';
import ModifyMessage from './ModifyMessage';

class Message extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          modFlag : false
      }
  }

  modMsg = (msg) => {

    console.log(msg, 'new message txt');
    console.log(this.props.message, 'original message in safespace state');
    console.log('modMsg has been triggered!');

    this.setState({
        modFlag : true
    })

    const modifiedMessage = {
        ...this.props.message,
        body : msg
    }

    this.props.modify(modifiedMessage);
  }

  render() {
    return (
      <div className='message'>
        <img className='scroll' src={scroll} alt='message_img'/>
        <p>{this.props.message.body}</p>
        <button onClick={this.modMsg}>Modify</button>
        <button onClick={() => this.props.delete(this.props.message)}>Delete</button>
        {this.state.modFlag && <ModifyMessage modMsg={this.modMsg}/>}
      </div>
    )
  }
}

export default Message;
