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

  toggleMod = () => {
    console.log('toggleMod has been triggered!');

    this.setState({
        modFlag : !this.state.modFlag
    })
  }
  
  render() {
    return (
      <div className='message'>
        <img className='scroll' src={scroll} alt='message_img'/>
        <p>{this.props.message.body}</p>
        <button onClick={this.toggleMod}>Modify</button>
        <button onClick={() => this.props.delete(this.props.message)}>Delete</button>
        
        {this.state.modFlag && <ModifyMessage message={this.props.message} modify={this.props.modify} toggleMod={this.toggleMod} />}
      </div>
    )
  }
}

export default Message;
