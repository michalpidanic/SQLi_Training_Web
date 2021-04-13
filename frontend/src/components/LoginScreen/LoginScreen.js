import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios'
import LoginForm from '../LoginForm/LoginForm'
import ModalMessage from '../ModalMessage/ModalMessage'
import './LoginScreen.scss'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            showModal: false,
            showAlert: false
        }

        this.onChange = this.onChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleClose = this.handleClose.bind(this)
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

        axios.post(`http://localhost:8000/login/${this.props.screenNum}/`,
            {
                username: this.state.username,
                password: this.state.password
            }
        ).then(
            res => {
                console.log(res)
                if (res.data.user.length > 0) {
                    this.setState({
                        showModal: true,
                        showAlert: false
                    })
                } else {
                    this.setState({
                        showAlert: true
                    })
                }
            }
        ).catch(
            error => { console.log(error) }
        )
    }

    handleClose() {
        this.setState({
            showModal: false
        })
    }

    render() {
        const alert = this.state.showAlert ?
            <Alert className='alert-box row-center' variant='danger'>Invalid credentials!</Alert> :
            null

        const description = [
            `Login 1 - basic vulnerable login function that finds, if given username and password match
            in database. From fronted the data are sent to backend where basic SQL 
            query without validation, quote escape or anything else is performed.`,
            `Login 2 - basic login function using same SQL query as Login 1, but data 
            that come to backend are escaped first and then put as parameters to SQL query.
            Basic SQLi doensn't work here anymore`,
            `Login 3 - login function secured against SQLi attacks. Function works identically as 
            other login functions used on this website, so it finds if given username and password 
            match in database, but instead of SQL, django ORM is used.`
        ]

        return (
            <Container fluid className='container-bg'>
                <Row className='row-center'>
                    <Col className='col-center'>
                        <Row className='row-center'>
                            <h1 className='login-title'>Login {this.props.screenNum}</h1>
                        </Row>
                        <Row className='row-center'>
                            <Col md={{ span: 4 }}>
                                <p className='description'>
                                    {description[this.props.screenNum - 1]}
                                </p>
                            </Col>
                        </Row>
                        <Row className='row-center'>
                            <Col md={{ span: 4 }}>
                                {alert}
                            </Col>
                        </Row>
                        <Row className='row-center'>
                            <LoginForm handleLogin={this.handleLogin} onChange={this.onChange} />
                        </Row>
                        <ModalMessage
                            show={this.state.showModal}
                            handleClose={this.handleClose}
                            title='Login successful!'
                            text='Your login was successful, close this message to continue.'
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

