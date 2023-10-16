import { useRouter } from "next/router";
import styles from "../../../styles/course.module.css";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useCourseById } from "@/frontend/hooks/useCourseById";

const Edit = () => {
    const [edit_toggle, setEdit_toggle] = useState(false);
    // get courseId from url
    const { query } = useRouter();
    const { courseData, updateCourse } = useCourseById(query.courseId ? query.courseId as string : null);
    const currentTopics = courseData ? courseData.topics : null;
    const [newTopics, setNewTopics] = useState<any>(currentTopics);

    useEffect(() => {
        if (currentTopics) {
            setNewTopics(currentTopics);
        }
    }, [currentTopics]);

    const addTopic = (name: string) => {
        const newTopic = {
            name,
            subTopics: []
        }
        setNewTopics([...newTopics, newTopic]);
    }

    const [addTopicIndex, setAddTopicIndex] = useState<number | any>(null);
    const toggleAddSubtopicForm = (topicIndex: number | null) => {
        if (addTopicIndex === null) {
            setAddTopicIndex(topicIndex);
        } else {
            setAddTopicIndex(null);
        }
    }
    const addSubTopic = (topicIndex: number, name: string, description: string) => {
        if (!name || name.length === 0 || !description || description.length === 0) {
            return alert("Please fill all the fields");
        }

        const newSubTopic = {
            name,
            description
        }

        const newTopicsArray = [...newTopics];
        newTopicsArray[topicIndex].subTopics.push(newSubTopic);
        setNewTopics(newTopicsArray);
        setAddTopicIndex(null);
    }

    const [editTopicIndex, setEditTopicIndex] = useState<number | any>(null);
    const [editSubTopicIndex, setEditSubTopicIndex] = useState<number | any>(null);
    const toggleEditSubtopicForm = (topicIndex: number | null, subTopicIndex: number | null) => {
        setEditTopicIndex(topicIndex);
        setEditSubTopicIndex(subTopicIndex);
    }
    const editSubTopic = (topicIndex: number, subTopicIndex: number, name: string, description: string) => {
        if (!name || name.length === 0 || !description || description.length === 0) {
            return alert("Please fill all the fields");
        }

        const newSubTopic = {
            name,
            description
        }

        const newTopicsArray = [...newTopics];
        newTopicsArray[topicIndex].subTopics[subTopicIndex] = newSubTopic;
        setNewTopics(newTopicsArray);
        setAddTopicIndex(null);
    }

    const deleteTopic = (topicIndex: number) => {
        if (topicIndex >= newTopics.length) {
            return alert("Invalid topic selected for deletion.");
        }
        if (window.confirm("Are you sure you want to delete this topic?")) {
            const newTopicsArray = [...newTopics];
            newTopicsArray.splice(topicIndex, 1);
            setNewTopics(newTopicsArray);
        }
    }

    const deleteSubTopic = (topicIndex: number, subTopicIndex: number) => {
        if (topicIndex >= newTopics.length || subTopicIndex >= newTopics[topicIndex].subTopics.length) {
            return alert("Invalid topic or subtopic selected for deletion.");
        }
        if (window.confirm("Are you sure you want to delete this subtopic?")) {
            const newTopicsArray = [...newTopics];
            newTopicsArray[topicIndex].subTopics.splice(subTopicIndex, 1);
            setNewTopics(newTopicsArray);
        }
    }

    const handleClickSave = async () => {
        if (window.confirm("Are you sure you want to save all the changes?")) {
            try {
                await updateCourse({
                    name: courseData.name,
                    description: courseData.description,
                    topics: newTopics
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

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
                    {newTopics && newTopics.map((topic: any, index: number) => {
                        return (
                            <Accordian key={index} topicIndex={index} topic={topic}
                                toggleAddSubtopicForm={(topicIndex: number) => {
                                    toggleAddSubtopicForm(topicIndex);
                                }}
                                toggleEditSubtopicForm={(subTopicIndex: number) => {
                                    toggleEditSubtopicForm(index, subTopicIndex);
                                }}
                                deleteTopic={deleteTopic}
                            />
                        )
                    })}
                    <div className={`${styles.edit__sidebar__header}`}>
                        {<AddNewTopicModal addTopic={addTopic} />}
                    </div>
                    <div className={`${styles.edit__sidebar__header} py-0`}>
                        <Button variant="light" className="w-100 text-center justify-content-center" onClick={handleClickSave}>
                            <i aria-hidden className="ms-0 mb-0 me-2 fas fa-arrow-left"></i>
                            Save and Exit
                        </Button>
                    </div>
                </div>

                {/* Make a main container to display the content of the selected tab */}
                <div className={`${styles.edit__main}`}>
                    {addTopicIndex !== null || editSubTopicIndex !== null ?
                        <SubtopicForm
                            addTopicIndex={addTopicIndex} editTopicIndex={editTopicIndex}
                            editSubTopicIndex={editSubTopicIndex}
                            addSubTopic={addSubTopic} editSubTopic={editSubTopic}
                            newTopics={newTopics} deleteSubTopic={deleteSubTopic}
                        />
                        :
                        <>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

const Accordian = (props: {
    topic: any,
    topicIndex: number,
    toggleAddSubtopicForm: Function,
    toggleEditSubtopicForm: Function,
    deleteTopic: Function
}) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    const [currentSubTopicIndex, setCurrentSubTopicIndex] = useState<number | null>(null);
    const handleClickSubTopic = (subTopicIndex: number) => {
        if (currentSubTopicIndex === subTopicIndex) {
            setCurrentSubTopicIndex(null);
            props.toggleEditSubtopicForm(null);
        } else {
            setCurrentSubTopicIndex(subTopicIndex);
            props.toggleEditSubtopicForm(subTopicIndex);
        }
    }

    return (
        <div>
            <div className={`${styles.edit__sidebar__header} ${open ? styles.active_header : ''}`}>
                <h3 className="mb-0" onClick={toggle}>{props.topic.name}</h3>
                <div className="d-flex justify-content-center align-items-center">
                    {/* Delete Trash */}
                    <i aria-hidden className="fas fa-trash m-0" onClick={() => props.deleteTopic(props.topicIndex)}></i>
                    <i aria-hidden className={open ? `fas fa-chevron-up` : `fas fa-chevron-down`} onClick={toggle}></i>
                </div>
            </div>
            {open && (<div className={`${styles.edit__sidebar__content}`}>
                <ul>
                    {props.topic.subTopics.map((subTopic: any, index: number) => {
                        return (
                            <li
                                key={index}
                                className={`${styles.edit__sidebar__subtopics} ${currentSubTopicIndex === index ? styles.active_subtopics : ''}`}
                                onClick={(event) => {
                                    handleClickSubTopic(index);
                                }}
                            >
                                {subTopic.name}
                            </li>
                        );
                    })}
                    <li className={`${styles.edit__sidebar__subtopics}`}>
                        <Button variant="primary" className="w-100 text-center justify-content-center" onClick={() => {
                            props.toggleAddSubtopicForm(props.topicIndex);
                        }}>
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

const SubtopicForm = (props: {
    addTopicIndex: number,
    editTopicIndex: number,
    editSubTopicIndex: number,
    newTopics: any[],
    addSubTopic: Function,
    editSubTopic: Function,
    deleteSubTopic: Function
}) => {
    const [subtopicName, setSubtopicName] = useState("");
    const [subtopicDescription, setSubtopicDescription] = useState("");

    const { query } = useRouter();
    const course = useCourseById(query.courseId ? query.courseId as string : null);

    useEffect(() => {
        if (props.editTopicIndex === null) return;

        // populate the form with the current subtopic data
        if (course !== null) {
            const subTopic = props.newTopics[props.editTopicIndex].subTopics[props.editSubTopicIndex];
            setSubtopicName(subTopic.name);
            setSubtopicDescription(subTopic.description);
        }
    }, [course, props.editSubTopicIndex])

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (props.editSubTopicIndex !== null) {
            props.editSubTopic(props.editTopicIndex, props.editSubTopicIndex, subtopicName, subtopicDescription)
        } else {
            props.addSubTopic(props.addTopicIndex, subtopicName, subtopicDescription)
        }
    }

    return (
        <div className={`${styles.edit__main__container}`}>
            <Container>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Subtopic Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Subtopic Title"
                            className={styles.text__input}
                            value={subtopicName}
                            onChange={(e) => setSubtopicName(e.target.value)} // Update subtopic name state
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Subtopic Theory</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="Enter Subtopic Description"
                            className={`${styles.text__input} w-100`}
                            value={subtopicDescription}
                            onChange={(e) => setSubtopicDescription(e.target.value)} // Update subtopic description state
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex gap-3 justify-content-end" controlId="formDescription" >
                        <Button type="submit" className={`mt-4 ${styles.upload__dp}`}>
                            SAVE
                        </Button>
                        <Button className={`mt-4 ${styles.upload__dp}`}>
                            CANCEL
                        </Button>
                        {props.editSubTopicIndex !== null ?
                            <Button className={`mt-4 ${styles.delete__btn}`} onClick={() => props.deleteSubTopic(props.editTopicIndex, props.editSubTopicIndex)}>
                                <i aria-hidden className="fas fa-trash"></i>
                            </Button>
                            :
                            <>
                            </>
                        }

                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
};

const AddNewTopicModal = (props: {
    addTopic: Function
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        props.addTopic(name);

        handleClose();
    }

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
                <Form onSubmit={handleSubmitForm}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Topic Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Topic Title" required value={name} onChange={(event) => setName(event.target.value)} />
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

export default Edit;