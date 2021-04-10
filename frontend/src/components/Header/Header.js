import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'

export default class Header extends Component {
    render() {
        return (
            <Navbar className='navbar' expand="lg" variant='dark'>
                <Navbar.Brand href="/">
                    <div className='brand-container'>
                        <FontAwesomeIcon
                            icon={faUserSecret}
                        />
                        <h5 className='brand-text'>SQLi</h5>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='navs-container'>
                    <Nav>
                        <NavDropdown title="Login" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/login1">Login 1</NavDropdown.Item>
                            <NavDropdown.Item href="/login2">Login 2</NavDropdown.Item>
                            <NavDropdown.Item href="/login3">Login 3</NavDropdown.Item>
                            <NavDropdown.Item href="/login4">Login 4</NavDropdown.Item>
                            <NavDropdown.Item href="/login5">Login 5</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
