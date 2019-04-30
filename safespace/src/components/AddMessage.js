import React from 'react';


class AddMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message : ''
        }

    }

    render() {

        return (
            <form onSubmit={ (e) => {e.preventDefault();  this.props.add(e.target[0].value) } }>
                <textarea name='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
                <button>Submit</button>
            </form>
        )
    }
}

export default AddMessage;

