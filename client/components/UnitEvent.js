import React, { Component } from 'react';

export default class extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const {name, category, point, date, time} = this.props.event;
        const d = date < 1000 ? '0' + date.toString() : date.toString();
        const formattedDate = d.substring(0,2) + '/' + d.substring(2) + '/' + (new Date()).getFullYear();
        return(
            <div className='events-event'>
                <h1 className='event-event-name'>{name}</h1>
                <p className='event-event-category'>{category}</p>
                <p className='event-event-point'>{point}</p>
                <p className='event-event-date'>{formattedDate}</p>
            </div>
        )
    }
}