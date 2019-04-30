import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const url = 'https://safespace-bw3.herokuapp.com/api/messages';


class SafeSpace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message_count : 0
        }
    }

    componentDidMount = () => {

        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const headers = {
            headers : {
                Authorization: `${token}`,
                id: `${id}`
            }
        };

        console.log("token in componentdidmount: ", localStorage.getItem('token'));

        axios.get(url,headers)
             .then( res => {
                 console.log( 'get messages in CDM: ', res);
                 this.setState({
                     ...this.state,
                     messages : res.data
                 })
                })
             .catch(err => console.log(err));
    }

    addMessage = () => {
        console.log('adding message');
        this.setState({
            message_count : this.state.message_count + 1
        })
    }

    render() {
        let messages = [];
        for (let i=0; i < this.state.messages; i++) {
            messages.push( <div>this is message {i}</div> ) 
        }
        return (
            <div className='safespace'>
                <header>
                    <Link to={'/login'}><button>Logout</button></Link>
                </header>
                <p>Welcome!  This is your SafeSpace.  Add a New Message.</p>
                <div>{messages}</div>
                <div className='add' onClick={this.addMessage}> + </div>
            </div>
        )
    }
}

export default SafeSpace;

