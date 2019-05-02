import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AddMessage from './AddMessage';
import Message from './Message';
// import {sms} from '../api/send_sms';


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
                     messages : res.data,
                     message_count : res.data.length
                 })
                })
             .catch(err => console.log(err));
    }

    componentDidUpdate(prevState) {
        console.log(prevState, 'previous state in componentDidUpdate');
        console.log(this.state.messages, this.state.message_count, 'messages remaining');
    }

    sms = (message,from,to) => {
        axios.post('http://localhost:8080/sms',{body : message.body,from,to})
             .then( res => {
                 console.log(res.data);
             })
             .catch( err => {
                 console.log(err);
             })
    }

    addMessage = (message,phone,duration) => {
        console.log('adding message');
        console.log(message);
        // this.setState({
        //     newMessage : message,
        //     message_count : this.state.message_count + 1
        // })

        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const headers = {
            headers : {
                Authorization: `${token}`,
                id: `${id}`
            }
        };

        // const body = {
        //     body : message,
        //     scheduled : time,
        // }
       
        axios.post(url,message,headers)
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

        this.sms(message,'+14694143109‬',phone);
        // setTimeout(this.sms,100,message,'+14694143109‬',phone);    
        setTimeout(this.sms,duration,message,'+14694143109‬',phone); 

        this.setState({
            add : false,
            newMessage : message,
            message_count : this.state.message_count + 1
        },()=>{console.log(this.state.newMessage,'newMessage')})
    }

    add = () => {
        console.log('add has been triggered!');
        this.setState({
            add : !this.state.add
        }
        )
    }

    delete = (message) => {
        console.log('delete has been triggered');
        console.log('message ', message);
        const base_url = 'https://safespace-bw3.herokuapp.com/api/messages'

        const headers = {
            headers : {
                Authorization : localStorage.getItem('token'),
                id : message.id
            }
        }
        
        console.log(headers, 'headers');

        axios.delete(`${base_url}/${message.id}`,headers)
             .then( res => {
                 console.log('delete response', res);
                 //if res.status = 204 
                 //
                 if (res.status === 204) {
                     this.setState({
                         messages : this.state.messages.filter( msg => msg !== message),
                         message_count : this.state.message_count - 1
                     })
                 }
                 
             })
             .catch( err => {
                 console.log('delete error' , err);
             })
    }

    modify = (message) => {
        console.log('modify has been triggered');
        console.log(message, ' this is the message object passed into the modify method');

        const base_url = 'https://safespace-bw3.herokuapp.com/api/messages';
        const headers = {
            headers : {
                Authorization : localStorage.getItem('token'),
                id : message.user_id
            }
        }

        axios.put(`${base_url}/${message.id}`,message,headers)
             .then( res => { 
                 console.log(res.data, 'response from the put request'); 
                 console.log(this.state.messages, 'this.state.messages');
                 const messages = this.state.messages.map( msg => {
                    if (msg.id === res.data.id) {
                        return res.data
                    } else {
                        return msg
                    }
                });

                this.setState({messages : messages});
            })
             .catch( err => console.log('put error ', err))
    }

    render() {
        return (
            <div className='safespace'>
                <header>
                    <Link to={'/login'}><button>Logout</button></Link>
                </header>
                <p>Welcome!  This is your SafeSpace.</p>
               {this.state.messages.map( (message,i) => <Message key={i} className='message' 
               message={message} delete={this.delete} modify={this.modify}/>)}
                <div className='add' onClick={this.add}> + </div>
                { this.state.add && <AddMessage add={this.addMessage}/>}

            </div>
        )
    }
}

export default SafeSpace;

