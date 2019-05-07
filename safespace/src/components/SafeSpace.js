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
            depressionQuotes : [{body: '"Whoever remains God conscious, God will provide a way out." -Quran'},{body: '"Don’t be sad, God is with us." -Prophet Muhammad'},{body: ' "Noble deeds and hot baths are the best cures for depression."  ― Dodie Smith'},{body: '"There is hope, even when your brain tells you there isnt" -John Green'},{body: '“Healing is not linear.”'},{body: '“Sometimes, life will kick you around, but sooner or later, you realize you’re not just a survivor. You’re a warrior, and you’re stronger than anything life throws your way." -Brooke Davis'},{body: '“And if today all you did was hold yourself together, I’m proud of you.”'},{body: '“Give yourself another day, another chance. You will find your courage eventually. Don’t give up on yourself just yet.”'},{body: '"Let the depression pass, like black clouds you see before a storm"'},{body: '"After the rain, comes out the sun"'}],
            anxiety : false,
            anxietyQuotes : [{body: '"The affair of the believer is amazing in that it is always good for him, and this is true only for a believer. If something joyful comes to him he gives thanks, and that is good for him. If something harmful comes to him, he is patient, and that is good for him." -Prophet Muhammad, Sahih Muslim'},{body: '"If any servant of Allah afflicted with distress or grief makes this supplication, his supplication will be accepted: ‘O Allah, I am Your servant, son of Your servant, son of your maidservant. My forehead is in Your hand. Your command concerning me prevails, and Your decision concerning me is just. I call upon You by every one of the beautiful names by which You have described Yourself, or which You have revealed in Your book, or have taught anyone of Your creatures, or which You have chosen to keep in the knowledge of the unseen with You, to make the Qur’an the delight of my heart, the light of my breast, and remover of my griefs, sorrows, and afflictions" -Prophet Muhammad, Ahmed'},{body: ' "Your attention must be directed to your life in the present – the time between two times. If you waste it, then you have wasted the opportunity to be of the fortunate and saved ones. If you look after it, having rectified the two times – what is before and after it – then you will be successful and achieve rest, delight and ever-lasting bliss"  ― ibn Al-Qayyim'},{body: '"Hope for the best and prepare for the worst" -Syed Haque'},{body: '“When the Prophet ﷺ was faced with a serious difficulty, he would always supplicate, “Ya Hayyu, ya Qayyumu, bi-rahmatika astaghithu (O the Living, O the Eternal, I seek help in Your Compassion).” Anas bin Malik, Tirmidhi'},{body: '“Sometimes, life will kick you around, but sooner or later, you realize you’re not just a survivor. You’re a warrior, and you’re stronger than anything life throws your way." -Brooke Davis'},{body: '“And surely We shall try you with something of fear and hunger, and loss of wealth and lives and crops; but give glad tidings to the patient; those who when a calamity befalls them say: ‘Indeed, to Allah we belong and to Him is our return’.”'},{body: '“Indeed, it is only the devil who is causing you to fear his friends. So do not fear them..." -Quran'},{body: '"Those who believe and have their hearts feel tranquility with the remembrance of God. Verily, in the remembrance of God do hearts find tranquility." -Quran'}, {body: '"After the rain, comes out the sun"'}],
            anger : false,
            angerQuotes : [{body: '"Speak when you are angry – and you’ll make the best speech you’ll ever regret." -Laurence J. Peter'},{body: '"Where there is anger, there is always pain underneath." -Eckhart Tolle'},{body: ' "“Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.."  ― Buddha'},{body: '"Throughout life people will make you mad, disrespect you and treat you bad. Let God deal with the things they do, cause hate in your heart will consume you too." -Will Smith'},{body: '“Do not be angry with people who do not have the capacity to change.” -Anonymous'},{body: '“Anger comes from the devil, the devil was created of fire, and fire is extinguished only by water; so when one of you becomes angry, he should perform wudu (ablution)" -Prophet Muhammad Abu Dawud 41:4766'},{body: '“If one of you is angry while he is standing, let him sit down so his anger will leave him; otherwise, let him lie down.” -Prophet Muhammad, Abu Dawud #4782'},{body: '“Anger is like a ball of fire, but if you swallow it, it is sweeter than honey.” -Ali bin Abi Talib'},{body: '"A strong one is not the one who defeats his opponent by wrestling; but the strong one is he who can control his anger." -Prophet Muhamamd'},{body: '"[The frontrunners in faith are those who] are able to swallow their anger and forgive and forget people. And God loves the gooddoers." -Quran 3:134'}]
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

    anxiety = () => {
        console.log('you have anxiety');
        this.setState({
            anxiety : !this.state.anxiety
        })
    }

    anger = () => {
        console.log('you have anger');
        this.setState({
            anger : !this.state.anger
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
                        {this.state.anxiety && this.state.anxietyQuotes.map( (quote,i) => <Quote key={i} className='message' quote={quote} sms={this.sms}/>)}
                        {this.state.anger && this.state.angerQuotes.map( (quote,i) => <Quote key={i} className='message' quote={quote} sms={this.sms}/>)}
                    </div>
                </div>
                {!this.state.message_count && <Mood add={this.addMessage} toggleAdd={this.add} depression={this.depression} anxiety={this.anxiety} anger={this.anger}/>} 
            </div>
        )
    }
}

export default SafeSpace;

