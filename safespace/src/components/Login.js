import React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }


    render() {
        return (
            <form>
                <input placeholder='username' type='text' name='username' value={this.state.username} onChange={this.input} />
                <input placeholder='password' type='password' name='password' value={this.state.password} onChange={this.input} />
                <button>Submit</button>
            </form>
        )

    }
}

export default Login;

