import React, { useState } from 'react'
import styles from './AddCourseModal.module.css'
import { Button, Modal, Form } from 'react-bootstrap'

function AddCourseModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className={`${styles.profile__picture}`}>
                <Button onClick={handleShow} className={`${styles.remove__dp}`}> <i className="fa-solid fa-plus me-2"></i> Add New Module</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD NEW MODAL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Module Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Module Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Module Description</Form.Label>
                            <Form.Control type="textarea" placeholder="Enter Module Description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTags">
                            {/* ToDo: Implement https://codepen.io/chaseottofy/pen/PodQNKO  */}
                            <Form.Label>Module Tags</Form.Label>
                            <Form.Control type="text" placeholder="Enter Module Tags">
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        ADD MODULE
                    </Button>
                </Modal.Footer>
            </Modal>


        </div >
    )
}

export default AddCourseModal
