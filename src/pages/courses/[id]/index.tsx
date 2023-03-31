import { useRouter } from "next/router";
import styles from "../../../styles/course.module.css";
import { useState } from "react";

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
                    <Accordian />
                    <Accordian />
                    <Accordian />
                </div>

                {/* Make a main container to display the content of the selected tab */}
                <div className={`${styles.edit__main}`}>
                    Main Page!
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

const Accordian1 = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    return (
        <div>
            <div className={`${styles.edit__sidebar__header}`} onClick={toggle}>
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
export default index;