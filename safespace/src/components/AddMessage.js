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
            <form onSubmit={this.props.edit}>
                <textarea name='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
                <button>Submit</button>
            </form>
        )
    }
}

export default AddMessage;

