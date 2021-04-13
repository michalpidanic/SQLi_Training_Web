import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import HomeScreen from '../components/HomeScreen/HomeScreen'
import LoginScreen from '../components/LoginScreen/LoginScreen'
import RegisterScreen from '../components/RegisterScreen/RegisterScreen'
import Header from '../components/Header/Header'

export default class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch {...this.props}>
                    <Route path='/' exact component={HomeScreen} />
                    <Route path='/login1' render={(props) => (<LoginScreen {...props} screenNum='1' />)} />
                    <Route path='/login2' render={(props) => (<LoginScreen {...props} screenNum='2' />)} />
                    <Route path='/login3' render={(props) => (<LoginScreen {...props} screenNum='3' />)} />
                    <Route path='/register' render={(props) => (<RegisterScreen {...props} />)} />
                    <Redirect to='/' />
                </Switch>
            </Router>
        )
    }
}
