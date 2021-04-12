import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'


export default class ModalMessage extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <Modal
                show={this.props.show}
                onHide={() => { this.props.handleClose() }}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h2>
                        Login successful!
                    </h2>
                </Modal.Header>
                <Modal.Body>
                    <p>Your login was successful, close this modal be continue.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={this.props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}