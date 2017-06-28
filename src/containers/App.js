import React,{ Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from '../components/nav/nav'
import "./css/app.css";


export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="wrap">
                        <Nav className="nav" />
                        <div className="right">{this.props.children}</div>
                </div>
            </MuiThemeProvider>
        )
    }
}