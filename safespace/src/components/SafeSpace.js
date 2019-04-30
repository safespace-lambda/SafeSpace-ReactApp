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

    // componentDidUpdate(prevProps,prevState) {
    //     if ( prevState.messages !== this.state.messages) {
    //         // this.setState({
    //         //     messages : this.state.messages.concat(this.state.newMessage)
    //         // })
    //         const token = localStorage.getItem('token');
    //         const id = localStorage.getItem('id');

    //         const headers = {
    //             headers : {
    //                 Authorization: `${token}`,
    //                 id: `${id}`
    //             }
    //         };

    //         console.log("token in componentdidmount: ", localStorage.getItem('token'));

    //         axios.get(url,headers)
    //             .then( res => {
    //                 console.log( 'get messages in CDM: ', res);
    //                 this.setState({
    //                     ...this.state,
    //                     messages : res.data
    //                 })
    //                 })
    //             .catch(err => console.log(err));
    //     }
    //         else {
    //             return null;
    //         }
    //     }

    addMessage = (message) => {
        console.log('adding message');
        console.log(message);
        this.setState({
            newMessage : message,
            message_count : this.state.message_count + 1
        })

        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const headers = {
            headers : {
                Authorization: `${token}`
                // id: `${id}`
            }
        };

        const body = {
            body : message,
            scheduled : new Date(),
        }

        console.log('body', body);
       
        axios.post(url,body,headers)
             .then( res => {
                 console.log('new message response: ', res.data);
                //  const newMessage = {
                //      ...res.data,
                //      body : this.state.newMessage
                //  }
                 this.setState({
                     messages : [...this.state.messages, res.data]
                 })                   
             })
             .catch( err => console.log('new message error', err))

        this.setState({
            add : false
        })
    }

    edit = () => {
        console.log('edit has been triggered!');
        this.setState({
            add : true,
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
                <div className='add' onClick={this.edit}> + </div>
                { this.state.add && <AddMessage add={this.addMessage}/>}
                {/* <input type='text' placeholder='add new message' /> */}

            </div>
        )
    }
}

export default SafeSpace;

