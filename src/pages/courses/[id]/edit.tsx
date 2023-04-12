import { useRouter } from "next/router";
import styles from "../../../styles/course.module.css";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

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
                </div>

                {/* Make a main container to display the content of the selected tab */}
                <div className={`${styles.edit__main}`}>
                    <Introduction />
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
                </ul>
            </div>)}
        </div>
    );
};

const Introduction = () => {
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
                        <Form.Control type="text" placeholder="Enter Module Title" className={styles.text__input}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Enter Module Description" className={styles.text__input}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Module Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Enter Module Description" className={styles.text__input}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTags">
                        <Form.Label>Module Tags</Form.Label>
                        <Form.Control type="text" placeholder="Enter Module Tags" className={styles.text__input}/>
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

const Subtopic = () => {
    return (
        <div className={`${styles.edit__main__container}`}>
            <h1>Subtopic 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, animi?</h1>
            <p>Module : Lorem ipsum dolor sit amet. / Topic 1 : Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            {/* Video Embed */}
            <Container className={`${styles.video__container}`}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/9bZkp7q19f0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Container>

            <Container className={`${styles.text__container}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi a natus recusandae laborum reprehenderit officiis alias saepe ab error dolorem quasi veniam similique ratione ullam ex earum, atque quo rerum quaerat. Est quibusdam, nemo quaerat dicta harum quam consectetur adipisci, voluptatum recusandae consequuntur, animi tenetur blanditiis itaque! <b>Possimus eos</b> id tempora sit corporis, neque eligendi aut, saepe ipsam quos ab nulla natus necessitatibus repellat voluptatibus expedita nemo sapiente provident voluptate tenetur. Quos placeat voluptatum illo repellendus dolor atque, laborum odit molestiae aspernatur minus iste assumenda esse voluptates dolorem dignissimos beatae reprehenderit ex molestias ipsam sed est expedita. <b>Lorem, ipsum </b>Mollitia laboriosam voluptate explicabo. Quibusdam voluptatem eaque, suscipit laboriosam ad ratione, et qui magnam dolores incidunt eveniet earum eligendi provident! Repellat beatae ut quaerat, temporibus libero inventore itaque harum eveniet! Est sequi, ad iste blanditiis iusto nulla nesciunt sed quas illum quibusdam id porro itaque eaque corrupti, sint voluptates accusantium eos pariatur dolorum!<br /><br />
                <ul>
                    <li>Point 1</li>
                    <li>Point 2</li>
                    <li>Point 3</li>
                    <li>Point 4</li>
                </ul>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reprehenderit odio rem officiis asperiores eveniet ipsa quod. Excepturi itaque blanditiis fugit quia labore, beatae perferendis dicta, nostrum asperiores voluptatum similique repellendus dolorum at aliquam a? Similique nihil ea, quam quos sint explicabo consequatur in fugiat placeat. Modi doloribus veniam eos voluptatum id aliquam illo saepe sequi officia totam iste vero aliquid similique libero, soluta deserunt dicta voluptatem, veritatis corporis quod aperiam? In incidunt cupiditate, nostrum a deserunt iste libero blanditiis reiciendis. Dolore illo beatae repudiandae aspernatur eos, dignissimos cumque veniam eligendi ipsa saepe suscipit et dolorum sapiente dicta quidem magnam.
            </Container>

            <Container className={`${styles.link__container}`}>
                <a href="Link_1 URL" target="_blank" rel="noreferrer">
                    <Button variant="primary" className={`${styles.link__button}`}>
                        Link 1 Text
                    </Button>
                </a>
                <a href="Link_2 URL" target="_blank" rel="noreferrer">
                    <Button variant="primary" className={`${styles.link__button}`}>
                        Link 2 Text
                    </Button>
                </a>
                <a href="Link_3 URL" target="_blank" rel="noreferrer">
                    <Button variant="primary" className={`${styles.link__button}`}>
                        Link 3 Text
                    </Button>
                </a>
            </Container>
        </div>
    );
};

export default index;