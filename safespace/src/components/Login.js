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
            },
            loginError : false,
            regError: false
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
        console.log(this.state.credentials);
       axios.post('https://safespace-bw3.herokuapp.com/api/auth/register',this.state.credentials)
            .then( res => {
                console.log(res, 'registration post response');
                localStorage.setItem('token', res.data.token);
                alert('Congratulations, you are registered.  Now you may login');
                this.setState({
                    regError : false,
                    loginError : false
                })
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    regError : true,
                    loginError : false
                })
            })
    } 

    login = (e) => {
        e.preventDefault();
        axios.post('https://safespace-bw3.herokuapp.com/api/auth/login',this.state.credentials)
             .then( res => {
                 console.log('login post response: ', res);
                 localStorage.setItem('id', res.data.user_id);
                 localStorage.setItem('token', res.data.token);
                 this.setState({
                     username : '',
                     password: '',
                     loginError : false,
                     regError : false
                 })
                 this.props.history.push('/');
             })
             .catch( err => {
                 console.log(err);
                 this.setState({
                    loginError : true,
                    regError : false
                })
             })
    }

    render() {
        return (
            <form className='login'>
                <h2>Safe Space</h2>
                <input placeholder='username' type='text' name='username' value={this.state.credentials.username} onChange={this.input} /><br/>
                <input placeholder='password' type='password' name='password' value={this.state.credentials.password} onChange={this.input} /><br/>
                <button onClick={this.register}>Register</button>
                <button onClick={this.login}>Login</button>
                {this.state.loginError && <p>Error Logging In. Please Try Again...</p>}
                {this.state.regError && <p>Error Registering. Please Try Again...</p>}

            </form>
        )

    }
}

export default Login;

