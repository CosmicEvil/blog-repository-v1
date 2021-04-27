import React, { Component } from 'react';
import gong from "../sound-effects/gong.mp3"

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ProTip from '../components/ProTip';
import { Link } from 'gatsby-theme-material-ui';
import Copyright from '../components/Copyright';


class Timer extends Component {
    constructor() {
        super();
        this.state = {
          minutes: 5,
          seconds: 0,
          checked: false
       
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addTime= this.addTime.bind(this)
       
    }
    playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
    }
    render() {
        const { minutes, seconds } = this.state
        return (
            <div className="timer light-green lighten-4">
                <audio className="audio-element">
                    <source src={gong}></source>
                </audio>

                { minutes === 0 && seconds === 0
                    ? <div className="time light-green-text text-darken-4"><h2>Time Remaining:</h2><h1>Done!</h1></div>
                    : <div className="time light-green-text text-darken-4"><h2>Time Remaining:</h2><h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1></div>
                }
                <form className="form" onSubmit={this.handleSubmit}>
                    { this.state.checked
                        ? <Button variant="contained" onClick={() => this.handleSubmit()} >stop</Button>
                        : <Button variant="contained" onClick={() => this.handleSubmit()}>start</Button>
                    }
                </form>
               <div className="more"> 
                    <Button variant="contained" color="primary" onClick={() => this.addTime(5,false, true)} >- 5m</Button>
                    <Button variant="contained" color="primary" onClick={() => this.addTime(1,false, true)}>- 1m</Button>
                    <Button variant="contained" color="primary" onClick={() => this.addTime(0.5,false,false)} >- 30s</Button>
                    <div className="break"></div>
                    <Button variant="contained" color="secondary" onClick={() => this.addTime(0.5,true, false)} >+ 30s</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.addTime(1,true, true)} >+ 1m</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.addTime(5,true, true)} >+ 5m</Button>
               
                </div>
            </div>
        )
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    addTime(time,add, min){
        const { seconds, minutes } = this.state
        const secondHelp = time * 60
        if(add && min){
            this.setState(({ minutes }) => ({
                minutes: minutes + time
            }))
        } else if(!add && min){
            if((minutes - time) > 0  ){
                this.setState(({ minutes }) => ({
                    minutes: minutes - time
                }))
            } else if((minutes - time) < 0){
                this.setState(({ minutes }) => ({
                    minutes: 0,
                    seconds: 0
                }))
            } else {
                this.setState(({ minutes }) => ({
                    minutes: 0 
                }))
            }
        }
        else if(add && !min){ 
            if((secondHelp + seconds) > 59){
                this.setState(({ minutes }) => ({
                    minutes: minutes + 1,
                    seconds: (secondHelp + seconds) - 60
                }))
            } else {
                this.setState(({ seconds }) => ({
                    seconds: secondHelp + seconds
                }))
            }
        } else {
            if((seconds - secondHelp) < 0){
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59 + (seconds - secondHelp)
                    }))
                    if ( minutes <= 0) {
                        this.setState(({ minutes }) => ({
                            minutes: 0,
                            seconds: 0
                        }))
                    }
            } else {
                this.setState(({ seconds }) => ({
                    seconds: seconds - secondHelp
                }))
           }
        }
    }
    handleSubmit(event) {
        this.playAudio()
       // event.preventDefault();
        if(!this.state.checked){
         //  audio.play() 
            this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
              this.setState(({ seconds }) => ({
                seconds: seconds - 1
              }))
            }
            if (seconds === 0) {
              if (minutes === 0) {
                this.playAudio();
                clearInterval(this.myInterval)
              } else {
                this.setState(({ minutes }) => ({
                  minutes: minutes - 1,
                  seconds: 59
                }))
              }
            }
          }, 1000)
     
        } else{
           clearInterval(this.myInterval)
        }
        this.setState({checked: !this.state.checked})
    }  
}
export default Timer;
