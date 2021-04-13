import React, { Component } from 'react'
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import ModalMessage from '../ModalMessage/ModalMessage'
import axios from 'axios'
import './RegisterScreen.scss'

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            passwordConfirmation: null,
            email: null,
            userInfo: null,
            invalidUsername: false,
            invalidPassword: false,
            invalidPasswordMsg: null,
            showModal: false,
            showAlert: false
        }

        this.onChange = this.onChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    onChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
            invalidPasswordMsg: null,
            invalidPassword: false,
            invalidUsername: false
        })
    }

    handleRegister(event) {
        event.preventDefault()

        const username = this.state.username
        const password = this.state.password
        const confirmation = this.state.passwordConfirmation

        if (password !== confirmation) {
            this.setState({
                invalidPassword: true,
                invalidPasswordMsg: `Password and confirmation doesn't match`
            })
            return
        } else if (!/^[a-z0-9]+$/i.test(password) || password === null || password.length < 5) {
            this.setState({
                invalidPassword: true,
                invalidPasswordMsg: `Password must be at least 5 characters long (a-z, A-Z, 0-9)`
            })
            return
        } else if (!/^[a-z0-9]+$/i.test(username) || username === null || username.length < 5) {
            this.setState({
                invalidUsername: true
            })
            return
        }

        // axios.post(`http://localhost:8000/register/`,
        //     {
        //         username: this.state.username,
        //         password: this.state.password,
        //         email: this.state.email,
        //         user_info: this.state.userInfo
        //     }
        // ).then(
        //     res => {
        //         console.log(res)
        //         if (res.data.user.length > 0) {
        //             this.setState({
        //                 showModal: true,
        //                 showAlert: false
        //             })
        //         } else {
        //             this.setState({
        //                 showAlert: true
        //             })
        //         }
        //     }
        // ).catch(
        //     error => { console.log(error) }
        // )
    }

    handleClose() {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <Container fluid className='container-bg'>
                <Row className='row-center'>
                    <Col className='col-center'>
                        <Row className='row-center'>
                            <h1 className='login-title'>Register</h1>
                        </Row>
                        <Row className='row-center'>
                            <Col md={{ span: 4 }} >
                                <p className='description'>
                                    Registration form with validation against unwanted input from user.
                                </p>
                            </Col>
                        </Row>
                        <Row className='row-center'>
                            <Col md={{ span: 4 }}>
                                <Form onSubmit={this.handleRegister}>

                                    {/* username */}
                                    <InputGroup hasValidation>
                                        <Form.Group className='input-width'>
                                            <Form.Label>
                                                <b>Username</b>
                                            </Form.Label>
                                            <Form.Control
                                                name='username'
                                                type='text'
                                                onChange={this.onChange}
                                                className='input-bg'
                                                isInvalid={this.state.invalidUsername}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Username must be at least 5 characters long (a-z, A-Z, 0-9)
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </InputGroup>

                                    {/* password */}
                                    <InputGroup hasValidation>
                                        <Form.Group className='input-width'>
                                            <Form.Label>
                                                <b>Password</b>
                                            </Form.Label>
                                            <Form.Control
                                                name='password'
                                                type='password'
                                                onChange={this.onChange}
                                                className='input-bg'
                                                isInvalid={this.state.invalidPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {this.state.invalidPasswordMsg}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </InputGroup>

                                    {/* password confirmation */}
                                    <Form.Group className='input-width'>
                                        <Form.Label>
                                            <b>Confirm password</b>
                                        </Form.Label>
                                        <Form.Control
                                            name='passwordConfirmation'
                                            type='password'
                                            onChange={this.onChange}
                                            className='input-bg'
                                        />
                                    </Form.Group>

                                    {/* email */}
                                    <Form.Group className='input-width'>
                                        <Form.Label>
                                            <b>Email</b>
                                        </Form.Label>
                                        <Form.Control
                                            name='email'
                                            type='text'
                                            onChange={this.onChange}
                                            className='input-bg'
                                        />
                                    </Form.Group>

                                    {/* info */}
                                    <Form.Group className='input-width'>
                                        <Form.Label>
                                            <b>About you</b>
                                        </Form.Label>
                                        <Form.Control
                                            name='userInfo'
                                            type='text'
                                            onChange={this.onChange}
                                            className='input-bg'
                                        />
                                    </Form.Group>

                                    {/* login button */}
                                    <Form.Row className='row-center'>
                                        <Button
                                            className='btn btn-primary btn-lg submit-button'
                                            type='submit'
                                            variant='success'
                                        >
                                            Create account
                                        </Button>
                                    </Form.Row>
                                </Form>
                            </Col>
                        </Row>
                        <ModalMessage
                            show={this.state.showModal}
                            handleClose={this.handleClose}
                            title='Registration successful!'
                            text={`${this.state.username} your registration was successful. Close this message to continue.`}
                        />
                    </Col>
                </Row >
            </Container >
        )
    }
}
