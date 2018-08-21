import React from 'react';
import {FormattedDate} from '../utils.js';

export default function event(props) {
    const {name, category, point, time, location} = props.event;
    const date = new FormattedDate(props.event.date);
    
    const imgStyle = {
        width: 200
    }

    return(
        <div className='events-detailed-event'>
            <img src='https://www.milton.ca/en/live/resources/Events.jpg' style={imgStyle} />
            <h1 className='event-event-name'>{name}</h1>
            <p className='event-event-category'>{category}</p>
            <p className='event-event-point'>{point}</p>
            <p className='event-event-date'>{date.date}</p>
            <p className='event-event-location'>{location}</p>
        </div>
    )
}