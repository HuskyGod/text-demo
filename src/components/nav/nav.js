import React, { Component } from 'react'
import {Link} from 'react-router'
import "./css/nav.css"

class Nav extends Component {
    render () {
        return (
            <div {...this.props}>
                <ul>
                    <li><Link activeClassName="active" to="/home">首页</Link></li>
                    <li><Link activeClassName="active" to="/blogs">博客</Link></li>
                    <li><Link activeClassName="active" to="/about">关于我</Link></li>
                    <li><Link activeClassName="active" to="/period">没有了哈哈</Link></li>                    
                </ul>
            </div>
        )
    }
}

export default Nav