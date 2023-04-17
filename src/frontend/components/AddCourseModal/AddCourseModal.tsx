import React, { useState } from 'react'
import styles from './AddCourseModal.module.css'
import { Button, Modal, Form } from 'react-bootstrap'
import useGlobalCourses from '@/frontend/hooks/useGlobalCourses';

function AddCourseModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { addCourse } = useGlobalCourses();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await addCourse({ name: title, description });
            console.log("🚀 ~ file: AddCourseModal.tsx:23 ~ handleFormSubmit ~ response:", response);
            alert('Course added successfully.');
        } catch (err) {
            console.log("🚀 ~ file: AddCourseModal.tsx:26 ~ handleFormSubmit ~ err:", err)
            alert('An error occurred. Please try again later.')
        }
    }

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
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Module Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Module Title" value={title} onChange={(event) => setTitle(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Module Description</Form.Label>
                            <Form.Control type="textarea" placeholder="Enter Module Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTags">
                            {/* ToDo: Implement https://codepen.io/chaseottofy/pen/PodQNKO  */}
                            <Form.Label>Module Tags</Form.Label>
                            <Form.Control type="text" placeholder="Enter Module Tags">
                            </Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-3">
                            <Button variant="danger" onClick={handleClose}>
                                CANCEL
                            </Button>
                            <Button variant="success" type='submit'>
                                CONFIRM
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>


        </div >
    )
}

export default AddCourseModal
