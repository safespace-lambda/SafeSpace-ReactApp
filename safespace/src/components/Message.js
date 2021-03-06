import React from 'react'
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
        <div className='msg-btns'>
          <button onClick={this.toggleMod}>Modify</button>
          <button onClick={() => this.props.delete(this.props.message)}>Delete</button>
        </div>
        
        <p>{this.props.message.body}</p>
        
        {this.state.modFlag && <ModifyMessage message={this.props.message} modify={this.props.modify} toggleMod={this.toggleMod} />}
      </div>
    )
  }
}

export default Message;
