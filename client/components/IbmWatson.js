//A form component uses IBM Watson model to suggest the top 10 events
import React, { Component }from 'react';
import axios from 'axios';

export default class extends Component{

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

//     async handleClick(evt){
//         evt.preventDefault;
//         try{
//             const prediction = await axios.post('/api/watson', {//some data})
//             console.log(prediction);
//         }catch(err){
//             console.error(err)
//         }       
//     }

    async handleClick(evt){
        evt.preventDefault;
        try{
            const prediction = await axios.get('/api/watson')
            console.log(prediction);
        }catch(err){
            console.error(err)
        }       
    }

    render(){
        return(
            <div className='watson'>
                <p>In watson</p>
                <button onClick={this.handleClick}>Prediction Test</button>
            </div>
        )  
    }
      
}