import React from 'react'

//collect the event info in an array or keep its object form to shorten the code

export default function event(props) {
    const {name, category, point, date, time, location} = props.event;
    const d = date < 1000 ? '0' + date.toString() : date.toString();
    const formattedDate = d.substring(0,2) + '/' + d.substring(2) + '/' + (new Date()).getFullYear();
    
    const imgStyle = {
        width: 200
    }

    return(
        <div className='events-detailed-event'>
            <img src='https://www.milton.ca/en/live/resources/Events.jpg' style={imgStyle} />
            <h1 className='event-event-name'>{name}</h1>
            <p className='event-event-category'>{category}</p>
            <p className='event-event-point'>{point}</p>
            <p className='event-event-date'>{formattedDate}</p>
            <p className='event-event-location'>{location}</p>
        </div>
    )
}