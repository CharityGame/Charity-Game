import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AllEvents } from './AllEvents';
import UnitEvent from './UnitEvent';
import DetailUnitEvent from './DetailUnitEvent';

const adapter = new Adapter();
enzyme.configure({adapter});

function Event(name, location, date, time, eventDuration, category, point){
    this.name = name;
    this.date = date;
    this.time = time;
    this.eventDuration = eventDuration;
    this.category = category;
    this.point = point;
}

describe('Event components', () => {

  let allEventsWrapper;

  const {
            name, 
            location, 
            date, 
            time, 
            eventDuration, 
            category, 
            point
        } = {
                name: 'Social Good', 
                location: '79 5th Avenue Suite 300 New York, NY 10003',
                date: 811,
                time: 930,
                eventDuration: 24,
                category: 'Coding',
                point: 5        
            };
      
   const eventList = [
    new Event(name, location, date, time, eventDuration, category, point),
    new Event(name+' 2', location, date + 1, time + 1, eventDuration, category, point + 1),
    new Event(name+' 3', location, date + 2, time + 2, eventDuration, category, point + 2)
   ];


  beforeEach(() => {
    allEventsWrapper = shallow(<AllEvents events={eventList} />)
  });

  describe('AllEvents component', () => {
    
    it('renders three <UnitEvent /> components', () => {
        expect(allEventsWrapper.find(UnitEvent)).to.have.lengthOf(3);
     });

    it('does not render any <DetailUnitEvent /> component', () => {
        expect(allEventsWrapper.find(DetailUnitEvent)).to.have.lengthOf(0);
     });

     describe('handleClick method', () => {
         
          beforeEach(() => {
              allEventsWrapper.find('button')
                    .first()
                    .simulate('click', {
                                            preventDefault: ()=>{},
                                            target: {id: 0}
                                        }
                                );
          });

          it('sets the detail value in state to true', () => {
            expect(allEventsWrapper.state().detail).to.be.true;
          });

          it('renders a <DetailUnitEvent /> component', () => {
              expect(allEventsWrapper.find(DetailUnitEvent)).to.have.lengthOf(1);
          });
      });
  });

  describe('UnitEvent component', () => {
      it('renders event name in an h1', () => {
          allEventsWrapper.find('h1').forEach((name, i) => {
              expect(name.text()).to.be.equal(eventList[i].name);
          });
      });
  });

})