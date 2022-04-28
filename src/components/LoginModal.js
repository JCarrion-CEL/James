import React, { useState, useMemo } from 'react'

import { Button, Modal, Form, Alert} from 'react-bootstrap'


const LoginModal = ({handleSave, handleClose, show }) => { 
    // const [show, setShow] = useState(_show);
    const [email, setEmail] = useState()
    const [invalidEmail, setInvalidEmail] = useState(false)

    // const [subscription, setSubscription] = useState(null);

    const emailValidation = async () => {
        //eslint-disable-next-line
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            return false;
        }
        return true;
    }

    const handleEmailChange = (event) => {
        let fleldVal = event.target.value;
        setEmail(fleldVal)
    }

    const handleSaveEmail = async () => {
        const valid = await emailValidation()
        if (valid) {
            setInvalidEmail(false)
            handleSave(email)
        }
        else setInvalidEmail(true)
    }
    const EmailInput = useMemo(() => {
        const errors = invalidEmail ?
            <Alert variant="danger" onClose={() => setInvalidEmail(false)} dismissible>
                <Alert.Heading>Invalid Email :(</Alert.Heading>
            </Alert>
            :
            null
        return (<Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control plaintext placeholder="email@example.com" onChange={handleEmailChange} />
            {errors}
        </Form.Group>)
    }, [invalidEmail])
  

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Login Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {EmailInput}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" className="btn btn-hover iq-button" onClick={handleSaveEmail}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
}
export default LoginModal;