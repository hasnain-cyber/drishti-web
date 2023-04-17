import useAuth from "@/frontend/hooks/useAuth";
import useCoursesByUser from "@/frontend/hooks/useCoursesByUser";
import useUserById from "@/frontend/hooks/useUserById";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import styles from "../../../styles/profile.module.css"

const index = () => {
    const router = useRouter();
    const { id: userId } = router.query;
    // user is the user whose profile is being viewed
    const user = useUserById(userId as string);
    console.log("🚀 ~ file: index.tsx:13 ~ index ~ user:", user)
    // userData is the logged in user
    const { userData } = useAuth();

    return (
        <div className={`${styles.profile__body}`}>
            {userData && user && userData['id'] === user['id'] && (
                <div className={`${styles.edit__button} d-flex align-items-center`} onClick={() => router.push(`/users/${userId}/edit`)}>
                    <i className="fa-solid fa-edit"></i>
                    Edit Profile
                </div>
            )}
            <div className={`${styles.profile__container}`}>
                <img className={`${styles.cover__image}`} src="/assets/profile/cover.jpg" />
                <div className={`${styles.main__container}`}>
                    <div className={`${styles.dp__container}`}>
                        <img className={`${styles.dp__image}`} src="/assets/profile/dp.jpg" />
                    </div>
                    <div className={`${styles.profile__details}`}>
                        <div className={`${styles.profile__name}`}>
                            {/* <h1>{user && user['name']}</h1> */}
                            <h1>{user?.name}</h1>
                        </div>
                        <div className={`${styles.profile__department}`}>
                            {/* <h2>{user && user['department']}</h2> */}
                            <h2>{user?.department}</h2>
                        </div>
                        <div className={`${styles.social__links}`}>
                            <div className={`${styles.social__link}`}>
                                <div className={`${styles.social__icon}`}>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className={`${styles.social__link__name}`}>
                                    <h3>{user?.institute}</h3>
                                </div>
                            </div>
                            <div className={`${styles.social__link}`}>
                                <div className={`${styles.social__icon}`}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className={`${styles.social__link__name}`}>
                                    <a href={`mailto: ${user?.email}`} target="_blank" rel="norefferer" className="text-decoration-none">
                                        <h3>{user?.email}</h3>
                                    </a>
                                </div>
                            </div>
                            <div className={`${styles.social__link}`}>
                                <div className={`${styles.social__icon}`}>
                                    <i className="fa-brands fa-linkedin"></i>
                                </div>
                                <div className={`${styles.social__link__name}`}>
                                    <a href={user?.linkedIn.url} target="_blank" rel="norefferer" className="text-decoration-none">
                                        <h3>{user?.linkedIn.name}</h3>
                                    </a>
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
                                <h3>{user?.contactNumber}</h3>
                            </div>
                        </div>
                        <div className={`${styles.left__element}`}>
                            <div className={`${styles.left__element__icon}`}>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className={`${styles.left__element__name}`}>
                                <h3>{user?.email}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.profile__right}`}>
                    <div className={`${styles.profile__right__container}`}>
                        <div className={`${styles.right__element}`}>
                            <h1>About Me</h1>
                            <p>
                                {user?.about}
                            </p>
                        </div>
                    </div>
                    <CoursesSection userId={user && user.id ? user.id : ''} />
                </div>
            </div>
        </div>
    );
};

const CoursesSection = (props: { userId: string }) => {
    // get courses by the user from all courses
    const courses = useCoursesByUser(props.userId);

    return (
        <div className={`${styles.right__element}`}>
            <h1>Courses</h1>
            {/* Render 6 Course Cards */}
            {
                courses.map((course, index) => {
                    return (
                        <CourseCard key={index} />
                    )
                })
            }
        </div>
    )
}

const CourseCard = () => {
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
                                    <div className={styles.topic}>Tag 1</div>
                                    <div className={styles.topic}>Tag 2</div>
                                    <div className={styles.topic}>Tag 3</div>
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