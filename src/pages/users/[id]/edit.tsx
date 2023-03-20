import useAuth from "@/frontend/hooks/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import styles from "../../../styles/editprofile.module.css"

const edit = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { id } = router.query;

    // function to add active class to sidebar item onClick
    const addActiveClass = (e: any) => {
        const sidebarItems = document.querySelectorAll(`.${styles.edit__sidebar__item}`);
        sidebarItems.forEach((item) => {
            item.classList.remove(styles.active);
        });
        e.target.classList.add(styles.active);
        const tabContent = document.querySelectorAll(`.${styles.edit__main__container}`);
        tabContent.forEach((content) => {
            content.classList.remove(styles.active_tab);
        });

        const tabId = e.target.id;

        // get the tab with className edit__main__container and id = tabId
        const tab = document.getElementById(tabId);
        tab && tab.classList.add(styles.active_tab);

    }


    return (
        <div className={`${styles.profile__body}`}>
            {/* <h1>Users Edit</h1>
            {!user && <p>Not logged in!</p>}
            {user && user.id !== id && <p>You are not authorized to edit this user!</p>}
            {user && <EditComponent />} */}

            {/* Frontend */}

            <div className={`${styles.edit__container}`}>

                {/* Make a sidebar to switch between tabs of Profile, Security and Courses */}
                <div className={`${styles.edit__sidebar}`}>
                    <div className={`${styles.edit__sidebar__item} ${styles.active}`} onClick={addActiveClass} id="profile_tab">
                        <i className="fa-solid fa-user"></i>
                        <h3>Profile</h3>
                    </div>
                    <div className={`${styles.edit__sidebar__item}`} onClick={addActiveClass} id="security_tab">
                        <i className="fa-solid fa-lock"></i>
                        <h3>Security</h3>
                    </div>
                    <div className={`${styles.edit__sidebar__item}`} onClick={addActiveClass} id="courses_tab">
                        <i className="fa-solid fa-book"></i>
                        <h3>Courses</h3>
                    </div>

                    {/* Go Back */}
                    <div className={`d-flex justify-content-center ${styles.edit__sidebar__item} ${styles.save__button}`} onClick={() => router.push(`/users/${id}`)}>
                        <i className="fa-solid fa-arrow-left"></i>
                        Go Back
                    </div>
                </div>

                {/* Make a main container to display the content of the selected tab */}
                <div className={`${styles.edit__main}`}>
                    <div className={`${styles.edit__main__container}`} id="profile_tab">
                        <h1>Profile</h1>
                        <p>Update Your Profile Information</p>
                        <div className={`${styles.profile__picture}`}>
                            <img src="/assets/profile/dp.jpg" alt="profile" className={`${styles.dp__image}`} />
                            <div className={`${styles.edit__dp}`} >
                                <Button className={`${styles.upload__dp}`}>Upload Image</Button>
                                <Button className={`${styles.remove__dp}`}><i className="fa-solid fa-trash" />Remove</Button>
                            </div>
                        </div>
                        <div className={`${styles.container__form}`}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="anubhav.singh@iiti.ac.in" disabled className={`${styles.text__input}`} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Anubhav Singh" className={`${styles.text__input}`} />
                                    <Form.Text className="text-muted m-1">
                                        Please Include Your Full Name along with the Title (Dr./Proff.)
                                    </Form.Text>
                                </Form.Group>

                                {/* Department form */}
                                <Form.Group className="mb-3" controlId="formBasicDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" placeholder="Department of Computer Science and Engineering" className={`${styles.text__input}`} />
                                </Form.Group>

                                {/* Institute Form */}
                                <Form.Group className="mb-3" controlId="formBasicInstitute">
                                    <Form.Label>Institute</Form.Label>
                                    <Form.Control type="text" placeholder="Indian Institute of Technology Indore" className={`${styles.text__input}`} />
                                </Form.Group>

                                {/* Contact Number */}
                                <Form.Group className="mb-3" controlId="formBasicContact">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" placeholder="+91 9234567890" className={`${styles.text__input}`} />
                                </Form.Group>

                                {/* Linked In Form */}
                                <Form.Group className="mb-3" controlId="formBasicLinkedIn">
                                    <Form.Label>LinkedIn</Form.Label>
                                    <div className={`${styles.input__group}`}>
                                        <h3>Text to Display:</h3>
                                        <Form.Control type="text" placeholder="Anubhav Singh Bassi" className={`${styles.text__input}`} />
                                        <h3>URL:</h3>
                                        <Form.Control type="text" placeholder="https://www.linkedin.com/in/anubhav-singh-bassi-0b1b3b1b3/" className={`${styles.text__input}`} />
                                    </div>
                                </Form.Group>

                                {/* Add 10 rows text-area form control for About Me*/}
                                <Form.Group className="mb-3" controlId="formBasicAbout">
                                    <Form.Label>About Me</Form.Label>
                                    <Form.Control as="textarea" rows={6} placeholder="About Me" className={`${styles.text__input}`} />
                                </Form.Group>

                                <Button variant="primary" type="submit" className={`mt-4 ${styles.upload__dp}`}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className={`${styles.edit__main__container}`} id="security_tab">
                        <h1>Security</h1>
                        <p>Update Your Security Information</p>
                        <div className={`${styles.container__form}`}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="anubhav.singh@iiti.ac.in" disabled className={`${styles.text__input}`} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Your Current Password" className={`${styles.text__input}`} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Your New Password" className={`${styles.text__input}`} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Your New Password" className={`${styles.text__input}`} />
                                </Form.Group>

                                <Button variant="primary" type="submit" className={`mt-4 ${styles.upload__dp}`}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className={`${styles.edit__main__container} ${styles.active_tab}`} id="courses_tab">
                        <h1>Courses</h1>
                        <p>You can add, edit or delete your Courses from here!</p>
                        <div className={`${styles.profile__picture}`}>
                            <Button className={`${styles.remove__dp}`}> <i className="fa-solid fa-plus"></i> Add Course</Button>
                        </div>
                        <Container className={`${styles.edit__courses__container}`}>
                            <h2>Your Courses: </h2>
                            {[1, 2, 4, 5, 6].map((__) => {
                                return (
                                    <CourseCard />
                                )
                            })}
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

const EditComponent = () => {
    const { user, updateUser } = useAuth();

    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (user) {
            const response = await updateUser({
                id: user.id,
                name,
                email
            });
        }
    }

    return (
        <div className={`${styles.profile__body}`}>
            {user &&
                <Form onSubmit={handleFormSubmit}>
                    <Form.Control required type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                    <Form.Control required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <button type="submit">Submit</button>
                </Form>
            }
        </div>
    );
}


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
            <Card className={`${styles.coursecard}`} onClick={() => router.push(`courses/falanademkana`)}>
                <Card.Body>
                    <Card.Text>
                        <div className={`d-flex ${styles.card__text}`}>
                            <div className={styles.avatar}><i className="fa-solid fa-book-open"></i></div>
                            <div className={styles.result__content}>
                                <div className={styles.result__title} role="button">Random Course Name</div>
                                <div className={styles.result__subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis iste odit ad deserunt eaque a provident nisi sapiente recusandae.</div>
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div>
                                        <div className={styles.topics}>
                                            <div className={styles.topic}>Tag 1</div>
                                            <div className={styles.topic}>Tag 2</div>
                                            <div className={styles.topic}>Tag 3</div>
                                        </div>
                                        <div className={styles.result__instructor}>Uploaded By: <span>Dr. Anubhav Singh Bassi</span></div>
                                    </div>
                                    <div>
                                        {/* Edit Course */}
                                        <div className={styles.course__button}>
                                            <i className="fa-solid fa-edit"></i>
                                            Edit Course
                                        </div>
                                        {/* Delete Course */}
                                        <div className={styles.course__button}>
                                            <i className="fa-solid fa-trash"></i>
                                            Delete Course
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default edit;