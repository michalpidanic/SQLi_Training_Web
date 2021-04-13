import React, { Component } from 'react'
import { Col, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './LoginForm.scss'


export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: 'password',
            icon: faEye
        }

        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        e.preventDefault()
        e.stopPropagation()

        this.setState({
            type: this.state.type === 'text' ? 'password' : 'text',
            icon: this.state.type === 'text' ? faEye : faEyeSlash
        })
    }

    render() {
        return (
            <Col md={{ span: 4 }}>
                <Form onSubmit={this.props.handleLogin}>

                    {/* username */}
                    <Form.Group>
                        <Form.Label>
                            <b>Username</b>
                        </Form.Label>
                        <Form.Control
                            name='username'
                            type='text'
                            onChange={this.props.onChange}
                            className='input-bg'
                        />
                    </Form.Group>

                    {/* password */}
                    <Form.Group>
                        <Form.Label>
                            <b>Password</b>
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                name='password'
                                type={this.state.type}
                                {...this.props}
                                onChange={this.props.onChange}
                                className='input-bg'
                            />

                            {/* show/hide password */}
                            <InputGroup.Append
                                onClick={this.onClick}
                            >
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={this.state.icon}
                                    />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    {/* login button */}
                    <Form.Row className='row-center'>
                        <Button
                            className='btn btn-primary btn-lg submit-button'
                            type='submit'
                            variant='success'
                        >
                            Login
                        </Button>
                    </Form.Row>
                </Form>
            </Col>
        )
    }
}
