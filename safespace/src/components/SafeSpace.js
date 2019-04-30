import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AddMessage from './AddMessage';

const url = 'https://safespace-bw3.herokuapp.com/api/messages';


class SafeSpace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message_count : 0,
            messages : [],
            add : false
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
            add : true
        })

        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const headers = {
            headers : {
                Authorization: `${token}`,
                id: `${id}`
            }
        };
        const body = {
            body : 'this is my first message.  Cheer Up Mate!',
            scheduled : new Date(),
        }
       
        axios.post(url,body,headers)
             .then( res => {
                 console.log('new message response: ', res.data);
                 this.setState({
                     messages : this.state.messages.concat(res.data)
                 })                   
             })
             .catch( err => console.log('new message error', err))

        this.setState({
        message_count : this.state.message_count + 1
        })     
    }

    edit = () => {
        console.log('edit has been triggered!');
        this.setState({
            add : false
        }
        )
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
                <div>{this.state.messages.map( message => <p>{message.body}</p>)}</div>
                <div className='add' onClick={this.addMessage}> + </div>
                { this.state.add && <AddMessage edit={this.edit}/>}
                {/* <input type='text' placeholder='add new message' /> */}

            </div>
        )
    }
}

export default SafeSpace;

