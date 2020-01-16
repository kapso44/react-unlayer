import React, { useState } from 'react'
import Script from 'react-load-script'
import { Modal, Button } from 'react-bootstrap';

function FormModal(data) {

    return(
        formModal()
    );

    function formModal() {
       const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
        <>
            <Button variant="primary" onClick={handleShow}>
            Save
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>{data.heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={data.onClick}>
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
        );
    }

    function saveForm() {
        console.log('test');
        data.onClick;
    }
}

export default FormModal