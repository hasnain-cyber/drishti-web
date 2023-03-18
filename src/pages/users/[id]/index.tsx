import useAuth from "@/frontend/hooks/useAuth";
import useUsers, { UserType } from "@/frontend/hooks/useUsers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "../../../styles/profile.module.css"

const index = () => {
    const router = useRouter();
    const { id: userId } = router.query;
    const [user, setUser] = useState<UserType | null>(null);
    const { users, usersStatus } = useUsers();
    useEffect(() => {
        if (users && userId) {
            const requiredUser = users.find((element) => element.id === userId);
            setUser(requiredUser || null);
        }
    }, [users, userId]);

    const { user: loggedInUser } = useAuth();

    return (
        <div className={`${styles.profile__body}`}>
            {/* <h1>{user && user['name']}</h1>
            {loggedInUser && loggedInUser['id'] === userId && <button>Edit</button>}
            <button>Edit2</button> */}
            {/* Starting with Profile Page */}

            <div className={`${styles.profile__container}`}>
                <img className={`${styles.cover__image}`} src="/assets/profile/cover.jpg" />
                <div className={`${styles.main__container}`}>
                    <div className={`${styles.dp__container}`}>
                        <img className={`${styles.dp__image}`} src="/assets/profile/dp.jpg" />
                    </div>
                    <div className={`${styles.profile__details}`}>
                        <div className={`${styles.profile__name}`}>
                            {/* <h1>{user && user['name']}</h1> */}
                            <h1>Dr. Anubhav Singh Bassi</h1>
                        </div>
                        <div className={`${styles.profile__department}`}>
                            {/* <h2>{user && user['department']}</h2> */}
                            <h2>Department of Computer Science and Engineering</h2>
                        </div>
                        <div className={`${styles.social__links}`}>
                            <div className={`${styles.social__link}`}>
                                <div className={`${styles.social__icon}`}>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className={`${styles.social__link__name}`}>
                                    <h3>Indian Institute of Technology, Indore</h3>
                                </div>
                            </div>
                            <div className={`${styles.social__link}`}>
                                <div className={`${styles.social__icon}`}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className={`${styles.social__link__name}`}>
                                    {/* <h3>{user && user['email']}</h3> */}
                                    <h3>anubhav.singh@iiti.ac.in</h3>
                                </div>
                            </div>
                            <div className={`${styles.social__link}`}>
                                <div className={`${styles.social__icon}`}>
                                    <i className="fa-brands fa-linkedin"></i>
                                </div>
                                <div className={`${styles.social__link__name}`}>
                                    <h3>Anubhav Singh Bassi</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.profile__container2}`}>
                <div className={`${styles.profile__left}`}>
                    <div className={`${styles.profile__left__container}`}>
                        <div className={`${styles.left__element}`}>
                            <div className={`${styles.left__element__icon}`}>
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className={`${styles.left__element__name}`}>
                                <h3>+91 9876543210</h3>
                            </div>
                        </div>
                        <div className={`${styles.left__element}`}>
                            <div className={`${styles.left__element__icon}`}>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className={`${styles.left__element__name}`}>
                                {/* <h3>{user && user['email']}</h3> */}
                                <h3>anubhav.singh@iiti.ac.in</h3>
                            </div>
                        </div>
                        <div className={`${styles.left__element}`}>
                            <div className={`${styles.domain}`}>
                                <h3>Artificial Inteligence</h3>
                            </div>
                            <div className={`${styles.domain}`}>
                                <h3>Computer Vision</h3>
                            </div>
                            <div className={`${styles.domain}`}>
                                <h3>Web Development</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.profile__right}`}>
                    <div className={`${styles.profile__right__container}`}>
                        <div className={`${styles.right__element}`}>
                            <h1>About Me</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quam voluptatibus, assumenda numquam cumque optio quisquam unde ab iusto nulla quae inventore, consequuntur, fugiat quasi beatae rerum quaerat suscipit praesentium quo illo earum debitis non. Veniam labore provident dicta quaerat dolorum veritatis culpa fugiat quos hic? Vero nesciunt alias voluptatum recusandae voluptates officiis impedit consectetur omnis facilis est? Id, reiciendis recusandae! Iure, fuga dolor?
                            </p>
                        </div>

                        <div className={`${styles.right__element}`}>
                            <h1>Courses</h1>
                            {/* Render 6 Course Cards */}
                            {
                                [1, 2, 3, 4, 5, 6].map((element) => {
                                    return (
                                        <CourseCard />
                                    );
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const CourseCard = () => {
    // const { courses, coursesStatus } = useCourses();
    // const [course, setCourse] = useState<CourseType | null>(null);
    // useEffect(() => {
    //     if (courses) {
    //         const course = courses.find((element) => element.id === props.courseId);
    //         // assign null again if course is not found.
    //         setCourse(course || null);

    //     }
    // }, [courses]);

    const router = useRouter();
    return (
        <div>
            <Card className={`${styles.coursecard}`} onClick={() => router.push(`courses/falanademkana`)} role={'button'}>
                <Card.Body>
                    <Card.Text>
                        <div className={`d-flex ${styles.card__text}`}>
                            <div className={styles.avatar}><i className="fa-solid fa-book-open"></i></div>
                            <div className={styles.result__content}>
                                <div className={styles.result__title}>Random Course Name</div>
                                <div className={styles.result__subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis iste odit ad deserunt eaque a provident nisi sapiente recusandae.</div>
                                <div className={styles.topics}>
                                    <div className={styles.topic}>Topic 1</div>
                                    <div className={styles.topic}>Topic 2</div>
                                    <div className={styles.topic}>Topic 3</div>
                                </div>
                                <div className={styles.result__instructor}>Uploaded By: <span>Dr. Anubhav Singh Bassi</span></div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default index;