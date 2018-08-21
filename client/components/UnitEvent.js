import React, { Component } from 'react';
import {FormattedDate} from '../utils.js';

export default class extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const {name, category, point, time} = this.props.event;
        const date = new FormattedDate(this.props.event.date);
        return(
            <div className='events-event'>
                <h1 className='event-event-name'>{name}</h1>
                <p className='event-event-category'>{category}</p>
                <p className='event-event-point'>{point}</p>
                <p className='event-event-date'>{date.date}</p>
            </div>
        )
    }
}