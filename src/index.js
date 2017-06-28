/**
 * Created by xuan on 16/7/27.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
import Login from './components/login/login'
import Home from './components/home/home'
import Blogs from './components/blogs/blogs'
import About from './components/about/about'
import Period from './components/period/period'
import HomeList from './components/homelist/list'
import {Route,Router,IndexRoute,browserHistory} from "react-router";
import configureStore from './utils/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
injectTapEventPlugin();

const store = configureStore()

ReactDOM.render(
    <Provider store={store} >
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/" component={App} >
                <Route path="/home" component={Home} />
                <Route path="/blogs" component={Blogs} />
                <Route path="/about" component={About} />
                <Route path="/period" component={Period} />
                <Route path="/home/:title" component={HomeList} />
            </Route>
        </Router>
    </Provider>
,document.getElementById('wrap'))