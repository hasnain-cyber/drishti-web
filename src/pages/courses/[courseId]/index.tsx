import { useCourseById } from "@/frontend/hooks/useCourseById";
import styles from "../../../styles/course.module.css";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import useUserById from "@/frontend/hooks/useUserById";

interface ICurrentTopicAndSubTopic {
    currentTopic: number | null,
    currentSubTopic: number | null
}

const index = () => {
    const [edit_toggle, setEdit_toggle] = useState(false);

    const { query } = useRouter();
    const courseId = query.courseId as string;
    const { course } = useCourseById(courseId ? courseId : null);

    const [currentTopicAndSubTopic, setCurrentTopicAndSubTopic] = useState<ICurrentTopicAndSubTopic>({
        currentTopic: null,
        currentSubTopic: null
    });
    const changeCurrentTopicAndSubTopic = (topic: number | null, subTopic: number | null) => {
        setCurrentTopicAndSubTopic({
            currentTopic: topic,
            currentSubTopic: subTopic
        });
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
                        <h3 className="fw-bold">{course && course.name}</h3>
                    </div>
                    {course && course.topics.map((topic: any, index: number) => {
                        return (
                            <Accordian key={index} topicIndex={index} topic={topic}
                                currentTopicAndSubTopic={currentTopicAndSubTopic}
                                changeCurrentTopicAndSubTopic={changeCurrentTopicAndSubTopic}
                            />
                        );
                    })}
                </div>

                {/* Make a main container to display the content of the selected tab */}
                <div className={`${styles.edit__main}`}>
                    {currentTopicAndSubTopic.currentTopic !== null && currentTopicAndSubTopic.currentSubTopic !== null ?
                        <Introduction courseId={courseId} currentTopicAndSubTopic={currentTopicAndSubTopic} />
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
    currentTopicAndSubTopic: ICurrentTopicAndSubTopic | null,
    changeCurrentTopicAndSubTopic: (topic: number | null, subTopic: number | null) => void
}) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    const handleOnClickTopic = () => {
        toggle();

        props.changeCurrentTopicAndSubTopic(props.topicIndex, null);
    }

    const handleOnClickSubTopic = (subTopicIndex: number) => {
        props.changeCurrentTopicAndSubTopic(props.topicIndex, subTopicIndex);
    }

    const isCurrentTopic = props.currentTopicAndSubTopic?.currentTopic === props.topicIndex;

    return (
        <div>
            <div className={`${styles.edit__sidebar__header} ${open ? styles.active_header : ''}`} onClick={handleOnClickTopic}>
                <h3>{props.topic.name}</h3>
                {open ? <i aria-hidden className="fas fa-chevron-up"></i> : <i aria-hidden className="fas fa-chevron-down"></i>}
            </div>
            {open && (<div className={`${styles.edit__sidebar__content}`}>
                <ul>
                    {props.topic && props.topic.subTopics.map((subTopic: any, index: number) => {
                        return (
                            <li key={index}
                                className={`${styles.edit__sidebar__subtopics} ${isCurrentTopic && props.currentTopicAndSubTopic?.currentSubTopic === index ? styles.active_subtopics : ''}`}
                                onClick={() => handleOnClickSubTopic(index)}
                            >
                                {subTopic.name}
                            </li>
                        );
                    })}
                </ul>
            </div>)}
        </div>
    );
};

const Introduction = (props: {
    courseId: string,
    currentTopicAndSubTopic: ICurrentTopicAndSubTopic
}) => {
    const { course } = useCourseById(props.courseId);
    const { userData } = useUserById(course ? course.ownerId : null);

    const [currentTopicAndSubTopicData, setCurrentTopicAndSubTopicData] = useState<any>({
        topic: null,
        subTopic: null
    });
    useEffect(() => {
        if (course && props.currentTopicAndSubTopic.currentTopic !== null && props.currentTopicAndSubTopic.currentSubTopic !== null) {
            setCurrentTopicAndSubTopicData({
                topic: course.topics[props.currentTopicAndSubTopic.currentTopic],
                subTopic: course.topics[props.currentTopicAndSubTopic.currentTopic].subTopics[props.currentTopicAndSubTopic.currentSubTopic]
            });
        }
    }, [course, props.currentTopicAndSubTopic.currentTopic, props.currentTopicAndSubTopic.currentSubTopic])

    return (
        <div className={`${styles.edit__main__container}`}>
            <Container>
                <h2>Topic: {currentTopicAndSubTopicData.topic && currentTopicAndSubTopicData.topic.name}</h2>
                <p className="ms-2">{userData ? userData.name : null}</p>

                <h3>Description</h3>
                {currentTopicAndSubTopicData.subTopic && currentTopicAndSubTopicData.subTopic.description}
            </Container>

        </div >
    );
};

export default index;