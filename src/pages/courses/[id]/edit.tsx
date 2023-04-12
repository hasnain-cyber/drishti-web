import { useRouter } from "next/router";
import styles from "../../../styles/course.module.css";
import { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

const index = () => {
    const router = useRouter();
    const { id } = router.query;
    const [edit_toggle, setEdit_toggle] = useState(false);

    return (
        <div className={`${styles.profile__body}`}>
            {/* Frontend */}
            <div className={`${styles.edit__hamburger}`} onClick={() => setEdit_toggle(!edit_toggle)}>
                Modules<i aria-hidden className={edit_toggle ? "ms-2 mb-0 fas fa-arrow-left" : "ms-2 mb-0 fas fa-arrow-right"}></i>
            </div>
            <div className={`${styles.edit__container}`}>
                {/* Mobile Menu Hamburger */}
                {/* Topics Section */}
                <div className={`${styles.edit__sidebar} ${edit_toggle ? styles.active__sidebar : ''}`}>
                    <div className={`${styles.edit__sidebar__header} `}>
                        {/* crop to 20 words */}
                        <h3 className="fw-bold">Module Title</h3>
                    </div>
                    <Accordian />
                    <Accordian />
                    <Accordian />
                    <div className={`${styles.edit__sidebar__header}`}>
                        <AddNewTopicModal />
                    </div>
                    <div className={`${styles.edit__sidebar__header} py-0`}>
                        <Button variant="light" className="w-100 text-center justify-content-center">
                            <i aria-hidden className="ms-0 mb-0 me-2 fas fa-arrow-left"></i>
                            Save and Exit
                        </Button>
                    </div>
                </div>

                {/* Make a main container to display the content of the selected tab */}
                <div className={`${styles.edit__main}`}>
                    {/* <IntroductionForm /> */}
                    <SubtopicForm />
                </div>
            </div>
        </div>
    );
};

const Accordian = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    return (
        <div>
            <div className={`${styles.edit__sidebar__header} ${open ? styles.active_header : ''}`} onClick={toggle}>
                <h3>Topic 1</h3>
                {open ? <i aria-hidden className="fas fa-chevron-up"></i> : <i aria-hidden className="fas fa-chevron-down"></i>}
            </div>
            {open && (<div className={`${styles.edit__sidebar__content}`}>
                <ul>
                    <li className={`${styles.edit__sidebar__subtopics} ${styles.active_subtopics}`}>Subtopic 1</li>
                    <li className={`${styles.edit__sidebar__subtopics}`}>Subtopic 2</li>
                    <li className={`${styles.edit__sidebar__subtopics}`}>Subtopic 3</li>
                    <li className={`${styles.edit__sidebar__subtopics}`}>
                        <Button variant="primary" className="w-100 text-center justify-content-center">
                            <i aria-hidden className="ms-0 mb-0 me-2 fas fa-plus"></i>
                            Add Subtopic
                            {/* Go to new Subtopic edit page with default name New SubTopic */}
                        </Button>
                    </li>
                </ul>
            </div>)}
        </div>
    );
};

const IntroductionForm = () => {
    return (
        <div className={`${styles.edit__main__container}`}>
            <Container>
                <h2 className="mb-4">
                    Edit Module
                </h2>
                {/* <p className="ms-2">Dr. Rishi Ranjan</p> */}
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Module Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Module Title" className={styles.text__input} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Enter Module Description" className={styles.text__input} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Module Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Enter Module Description" className={styles.text__input} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTags">
                        <Form.Label>Module Tags</Form.Label>
                        <Form.Control type="text" placeholder="Enter Module Tags" className={styles.text__input} />
                    </Form.Group>

                    {/* Save */}
                    <Button variant="primary" type="submit" className={`mt-4 ${styles.upload__dp}`}>
                        Submit
                    </Button>

                </Form>
            </Container>

        </div >
    );
};

const SubtopicForm = () => {
    return (
        <div className={`${styles.edit__main__container}`}>
            <p>Module : Lorem ipsum dolor sit amet. / Topic 1 : Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Subtopic Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Subtopic Title" className={styles.text__input} />
                    </Form.Group>

                    <Form.Group className={`mb-3`} controlId="formTitle">
                        <Form.Label>Video Link if Any: </Form.Label>
                        <Form.Control type="text" placeholder="Enter Subtopic Title" className={`${styles.text__input}`} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        {/* https://codepen.io/ronhook/pen/jQZYxj */}
                        <Form.Label>Subtopic Theory</Form.Label>
                        <Form.Control as="textarea" rows={10} placeholder="Enter Subtopic Description" className={`${styles.text__input} w-100`} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLinkedIn">
                        <div className={`${styles.input__group} align-item-center`}>
                            <Form.Label className="mb-0">Link 1: </Form.Label>
                            <h3>Text to Display:</h3>
                            <Form.Control type="text" className={`${styles.text__input}`} />
                            <h3>URL:</h3>
                            <Form.Control type="text" className={`${styles.text__input}`} />
                            <Button variant="danger" className={`${styles.delete__button}`}>
                                <i aria-hidden className="fas fa-times"></i>
                            </Button>
                        </div>
                        <div className={`${styles.input__group} align-item-center`}>
                            <Form.Label className="mb-0">Link 2: </Form.Label>
                            <h3>Text to Display:</h3>
                            <Form.Control type="text" className={`${styles.text__input}`} />
                            <h3>URL:</h3>
                            <Form.Control type="text" className={`${styles.text__input}`} />
                            <Button variant="danger" className={`${styles.delete__button}`}>
                                <i aria-hidden className="fas fa-times"></i>
                            </Button>
                        </div>
                        {/* Add New Link Field */}
                        <Button variant="primary" className={`${styles.link__button}`}>
                            <i aria-hidden className="fas fa-plus" /> ADD NEW LINK
                        </Button>
                    </Form.Group>

                </Form>
            </Container>
        </div>
    );
};

const AddNewTopicModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-light" className="w-100 text-center justify-content-center" onClick={handleShow}>
                <i aria-hidden className="ms-0 mb-0 me-2 fas fa-plus"></i>
                Add Topic
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ADD NEW TOPIC</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Topic Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Topic Title" />
                        </Form.Group>



                    </Modal.Body>
                    <Modal.Footer>
                        {/* Save */}
                        <Button variant="primary" type="submit" className={`mt-4 ${styles.upload__dp}`}>
                            {/* Redirect to new Subtopic form with default name */}
                            ADD TOPIC
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default index;