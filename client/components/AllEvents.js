import React, { Component } from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import UnitEvent from './UnitEvent';
import DetailUnitEvent from './DetailUnitEvent';

export class AllEvents extends Component{

    constructor(props){
        super(props);

        this.state = {
          detail: false,
          event: props.events[0]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt){
      evt.preventDefault();
      const id = evt.target.id;
      const event = this.props.events.filter(event => event.id == id)[0];
      this.setState({
        event,
        detail: !this.state.detail
      })      
    }

    render(){
        return(
            <div className='events'>
                {
                   this.props.events.map(event => {
                       return(
                            <div key={event.name} className='events-unit-event'>
                                <UnitEvent event = {event}/>
                                <button onClick={this.handleClick} id={event.id}> More Detail </button>
                            </div>
                       )
                   })
                }
                {
                  this.state.detail ? <DetailUnitEvent event = {this.state.event} /> 
                                        : null
                }
            </div>
        )
    }
}

const mapState = state => {
  return {
    events: state.events
  }
}

export default connect(mapState)(AllEvents)

AllEvents.propTypes = {
  events: PropTypes.array
}