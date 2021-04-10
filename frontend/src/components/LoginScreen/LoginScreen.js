import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../LoginForm/LoginForm'
import './LoginScreen.scss'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null
        }

        this.onChange = this.onChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    onChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleLogin(event) {
        event.preventDefault()

        console.log(this.state)
    }

    render() {
        return (
            <Container fluid className='container-bg'>
                <Row className='row-center'>
                    <Col className='col-center'>
                        <Row className='row-center'>
                            <h1 className='login-title'>Login {this.props.screenNum}</h1>
                        </Row>
                        <Row className='row-center'>
                            <p>
                                Description
                            </p>
                        </Row>
                        <Row className='row-center'>
                            <LoginForm handleLogin={this.handleLogin} onChange={this.onChange} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

