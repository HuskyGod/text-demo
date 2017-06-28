import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import "./css/main.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            login: true
        };
    }
    componentDidMount () {
        let interval = setInterval(() => {
                if(this.state.time < 100) {
                    this.setState({time: this.state.time + 1})
                } else {
                    this.setState({login: false})
                    clearInterval(interval)
                }
            },100) 
    }
    render () {
        return (
            <div id="warp">
                <h1 className="title">Welcome to my blog</h1>
                <div id="module">
                    <div id="rotate">
                        <div className="module_left"></div>
                        <div className="module_center"></div>
                        <div className="module_right"></div>
                    </div>
                    <div className="info">
                        {this.state.login && (<span className={this.state.login ? "hidden": ""}>{this.state.time} %</span>)}
                        {!this.state.login && (<span className={!this.state.login ? "btn": ""}><button id="button" onClick={() => {browserHistory.push({pathname: "/home"})}}> Login</button></span>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login