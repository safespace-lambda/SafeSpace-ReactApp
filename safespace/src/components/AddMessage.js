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
        console.dir(e.target);

        const phone = e.target[1].value;
        const targetTime = e.target[2].value;
        const currentHours = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const pieces = targetTime.split(':');
        const targetHours = parseInt(pieces[0],10);
        const targetMinutes = parseInt(pieces[1],10);
        const durationHours = targetHours - currentHours;
        const durationMinutes = targetMinutes - currentMinutes;
        const duration = durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000
        console.log(currentHours,currentMinutes,targetHours,targetMinutes,'duration: ',duration);

        const message = {
            body : e.target[0].value,
            // scheduled : e.target[1].value
            scheduled : new Date()
        }

        this.props.add(message,phone,duration);
    }

    render() {

        return (
                <form className='add-msg' onSubmit={ (e) => this.msgMaker(e)}>
                    <textarea id='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
                    <input type='text' name='phone' placeholder='Phone number without dashes' /> <br/>
                    <input type='time' name='time' placeholder='time'/>  <br/>
                    <button>Submit</button>
                    <button onClick={this.props.toggleAdd}>Close</button>
                </form>
        )
    }
}

export default AddMessage;

