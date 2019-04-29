/*authentiction:
1. axios post ( url , {username , password} )
2. respond with token and user_id
3. set localstorage with "tokoen " response.token
4. in component where we need the data, do axios.get(url, header) .   header = localStorage.getItem('token')
*/

import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials : {
                username: '',
                password: ''
            }
        }
    }

    input = (e) => {
        this.setState({
            credentials : {
                ...this.state.credentials,
                [e.target.name] : e.target.value                
            }
                
        })
    }
    register = (e) => {
        e.preventDefault();
    //    const username = e.target[0].value;
    //    const password = e.target[1].value;
    //    console.log(this.state.credentials.username, this.state.credentials.password);
    //    console.log(username,password);
        console.log(this.state.credentials);
       axios.post('https://safespace-bw3.herokuapp.com/api/auth/register',this.state.credentials)
            .then( res => {
                console.log(res.data.token);
                localStorage.setItem('token', res.data.token);
            })
            .catch( err => {
                console.log(err);
            })
    } 

    login = (e) => {
        e.preventDefault();


    }

    render() {
        return (
            <form>
                <input placeholder='username' type='text' name='username' value={this.state.credentials.username} onChange={this.input} /><br/>
                <input placeholder='password' type='password' name='password' value={this.state.credentials.password} onChange={this.input} /><br/>
                <button onClick={this.register}>Register</button>
                <button onClick={this.login}>Login</button>
            </form>
        )

    }
}

export default Login;

