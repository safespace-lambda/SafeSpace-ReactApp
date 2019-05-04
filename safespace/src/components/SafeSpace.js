import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AddMessage from './AddMessage';
import Message from './Message';
import Mood from './Mood';
import Quote from './Quote';

// import {sms} from '../api/send_sms';


const url = 'https://safespace-bw3.herokuapp.com/api/messages';


class SafeSpace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message_count : 0,
            messages : [],
            add : false,
            depression : false,
            depressionQuotes : [{body: '"Whoever remains God conscious, God will provide a way out." -Quran'},{body: '"Don’t be sad, God is with us." -Prophet Muhammad'},{body: ' "Noble deeds and hot baths are the best cures for depression."  ― Dodie Smith'},{body: '"There is hope, even when your brain tells you there isnt" -John Green'},{body: '“Healing is not linear.”'},{body: '“Sometimes, life will kick you around, but sooner or later, you realize you’re not just a survivor. You’re a warrior, and you’re stronger than anything life throws your way." -Brooke Davis'},{body: '“And if today all you did was hold yourself together, I’m proud of you.”'},{body: '“Give yourself another day, another chance. You will find your courage eventually. Don’t give up on yourself just yet.”'},{body: '"Let the depression pass, like black clouds you see before a storm"'},{body: '"After the rain, comes out the sun"'}]
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

        // console.log("token in componentdidmount: ", localStorage.getItem('token'));

        axios.get(url,headers)
             .then( res => {
                //  console.log( 'get messages in CDM: ', res);
                 this.setState({
                     ...this.state,
                     messages : res.data,
                     message_count : res.data.length
                 })
                })
             .catch(err => console.log(err));
    }

    // componentDidUpdate(prevState) {
    //     console.log(prevState, 'previous state in componentDidUpdate');
    //     console.log(this.state.messages, this.state.message_count, 'messages remaining');
    // }

    sms = (message,from,to) => {
        console.log('sms triggered from SendSMS');
        console.log(message, 'quote');
        console.log(from,'from');
        console.log('to',to);

        axios.post('https://safespace-lambda.herokuapp.com/sms',{body : message.body,from,to})
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
                 this.setState({
                     messages : [...this.state.messages, res.data]
                 })
                 this.sms({body:'message will be sent'},'+14694143109‬',phone);
             })
             .catch( err => console.log('new message error', err))

        setTimeout(this.sms, duration, message,'+14694143109‬',phone); 

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
                this.sms(message,'+14694143109‬','7577449783');
            })
             .catch( err => console.log('put error ', err))
    }

    logout = () => {
        localStorage.clear();

    }

    depression = () => {
        console.log('you are depressed');
        this.setState({
            depression : !this.state.depression
        })
    }

    render() {
        return (
            <div className='safespace'>
                <header>
                    <div className='btns-safespace'>
                        <button onClick={this.add}> Add Message </button>
                        <Link to={'/login'}><button onClick={this.logout}>Logout</button></Link>
                    </div>
                </header>
                <div className='messages'>
                    {this.state.messages.map( (message,i) => <Message key={i} className='message' 
                    message={message} delete={this.delete} modify={this.modify}/>)}
                    {this.state.add && <AddMessage add={this.addMessage} toggleAdd={this.add}/>}

                    <div className='quotes'>
                        {this.state.depression && this.state.depressionQuotes.map( (quote,i) => <Quote key={i} className='message' quote={quote} sms={this.sms}/>)}
                    </div>
                </div>
                {!this.state.message_count && <Mood add={this.addMessage} toggleAdd={this.add} depression={this.depression}/>} 
            </div>
        )
    }
}

export default SafeSpace;

