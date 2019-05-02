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

        const phone = e.target[2].value;
        const targetTime = e.target[1].value;
        const currentHours = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const pieces = targetTime.split(':');
        const targetHours = parseInt(pieces[0],10);
        const targetMinutes = parseInt(pieces[1],10);
        const durationHours = targetHours - currentHours;
        const durationMinutes = targetMinutes - currentMinutes;
        const duration = durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000
        console.log(currentHours,currentMinutes,targetHours,targetMinutes,'duration: ',duration);

        //get current time. 
        //targetTime - current time = duration
        //convert duration into milliseconds.

        const time = new Date(Date.now(), pieces[0],pieces[1]);
        

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



        this.props.add(message,phone);
    }

    render() {

        return (
            <form onSubmit={ (e) => this.msgMaker(e)}>
                <textarea id='message' rows='10' cols='30' placeholder='Enter Inspirational Message Here'/><br/>
                <input type='time' name='time' placeholder='time'/>
                <input type='text' name='phone' />
                <button>Submit</button>
            </form>
        )
    }
}

export default AddMessage;

