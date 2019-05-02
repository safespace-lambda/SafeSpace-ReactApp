import React from 'react';


class AddMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message : ''
        }
    }

    msgMaker = (e) => {
        e.preventDefault();
        console.log(e.target[1].value, 'time in msgMaker');

        const timeInput = e.target[1].value;
        const pieces = timeInput.split(':');
        const time = new Date(Date.now(), pieces[0],pieces[1]);
        console.log(null,null,null,'date');

        // console.log(time, 'time');
        // console.log('pieces', pieces);
        // const today = new Date();
        // const date = today.getFullYear();
        // console.log(date, 'date');
        
        const message = {
            body : e.target[0].value,
            // scheduled : e.target[1].value
            scheduled : time
            
        }
        this.props.add(message);
    }

    render() {

        return (
            <form onSubmit={ (e) => this.msgMaker(e)}>
                <textarea id='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
                <input type='time' id='time' placeholder='time'/>
                <button>Submit</button>
            </form>
        )
    }
}

export default AddMessage;

