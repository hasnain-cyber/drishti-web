import React from "react";
import useAuth from "@/frontend/hooks/useAuth";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import styles from "../../../styles/editprofile.module.css";

enum Tabs {
    Profile = "profile_tab",
    Security = "security_tab",
    Courses = "courses_tab",
}

const edit = () => {
    const router = useRouter();
    const { id } = router.query;

    const [tab, setTab] = useState(Tabs.Profile);

    const changeTab: MouseEventHandler<HTMLDivElement> = (e) => {
        switch (e.currentTarget.getAttribute('data-name')) {
            case Tabs.Security:
                setTab(Tabs.Security);
                break;
            case Tabs.Courses:
                setTab(Tabs.Courses);
                break;
            default:
                setTab(Tabs.Profile);
                break;
        }
    }

    return (
        <div className={`${styles.profile__body}`}>
            {/* Frontend */}
            <div className={`${styles.edit__container}`}>

                {/* Make a sidebar to switch between tabs of Profile, Security and Courses */}
                <div className={`${styles.edit__sidebar}`}>
                    <div className={`${styles.edit__sidebar__item} ${tab === Tabs.Profile ? styles.active : ''}`} onClick={changeTab} data-name={Tabs.Profile}>
                        <i className="fa-solid fa-user"></i>
                        <h3>Profile</h3>
                    </div>
                    <div className={`${styles.edit__sidebar__item} ${tab === Tabs.Security ? styles.active : ''}`} onClick={changeTab} data-name={Tabs.Security}>
                        <i className="fa-solid fa-lock"></i>
                        <h3>Security</h3>
                    </div>
                    <div className={`${styles.edit__sidebar__item} ${tab === Tabs.Courses ? styles.active : ''}`} onClick={changeTab} data-name={Tabs.Courses}>
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
                    {tab === Tabs.Profile && <PofileTab />}
                    {tab === Tabs.Security && <SecurityTab />}
                    {tab === Tabs.Courses && <CoursesTab />}
                </div>
            </div>
        </div>
    );
}

const PofileTab = () => {
    const { userData, updateProfile } = useAuth();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [institute, setInstitute] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [linkedIn, setLinkedIn] = useState({
        name: '',
        url: ''
    });
    const [about, setAbout] = useState("");

    React.useEffect(() => {
        if (userData) {
            setEmail(userData.email);
            setName(userData.name);
            setDepartment(userData.department);
            setInstitute(userData.institute);
            setContactNumber(userData.contactNumber);
            setLinkedIn({
                name: userData.linkedIn.name,
                url: userData.linkedIn.url
            });
            setAbout(userData.about);
        }
    }, [userData]);

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userData) {
            updateProfile({
                email,
                name,
                department,
                institute,
                contactNumber,
                linkedIn,
                about,
                token: userData.token,
                id: userData.id
            }).then(() => {
                console.log("Profile Updated");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className={`${styles.edit__main__container}`} id="profile_tab">
            <h1>Profile</h1>
            <p>Update Your Profile Information</p>
            <div className={`${styles.profile__picture}`}>
                <img src="/assets/profile/dp.jpg" alt="profile" className={`${styles.dp__image}`} />
                <div className={`${styles.edit__dp}`} >
                    <Button className={`${styles.upload__dp}`}>Update Image</Button>
                    <Button className={`${styles.remove__dp}`}><i className="fa-solid fa-trash" />Remove</Button>
                </div>
            </div>
            <div className={`${styles.container__form}`}>
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" disabled className={`${styles.text__input}`} value={email} onChange={event => setEmail(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} className={`${styles.text__input}`} />
                        <Form.Text className="text-muted m-1">
                            Please Include Your Full Name along with the Title (Dr./Proff.)
                        </Form.Text>
                    </Form.Group>

                    {/* Department form */}
                    <Form.Group className="mb-3" controlId="formBasicDepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" value={department} onChange={event => setDepartment(event.target.value)} className={`${styles.text__input}`} />
                    </Form.Group>

                    {/* Institute Form */}
                    <Form.Group className="mb-3" controlId="formBasicInstitute">
                        <Form.Label>Institute</Form.Label>
                        <Form.Control type="text" value={institute} onChange={event => setInstitute(event.target.value)} className={`${styles.text__input}`} />
                    </Form.Group>

                    {/* Contact Number */}
                    <Form.Group className="mb-3" controlId="formBasicContact">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" value={contactNumber} onChange={event => setContactNumber(event.target.value)} className={`${styles.text__input}`} />
                    </Form.Group>

                    {/* Linked In Form */}
                    <Form.Group className="mb-3" controlId="formBasicLinkedIn">
                        <Form.Label>LinkedIn</Form.Label>
                        <div className={`${styles.input__group}`}>
                            <h3>Text to Display:</h3>
                            <Form.Control type="text" value={linkedIn.name} onChange={event => setLinkedIn((value) => {
                                return {
                                    ...value,
                                    name: event.target.value
                                }
                            })} className={`${styles.text__input}`} />
                            <h3>URL:</h3>
                            <Form.Control type="text" value={linkedIn.url} onChange={event => setLinkedIn((value) => {
                                return {
                                    ...value,
                                    url: event.target.value
                                }
                            })} className={`${styles.text__input}`} />
                        </div>
                    </Form.Group>

                    {/* Add 10 rows text-area form control for About Me*/}
                    <Form.Group className="mb-3" controlId="formBasicAbout">
                        <Form.Label>About Me</Form.Label>
                        <Form.Control as="textarea" rows={6} value={about} onChange={event => setAbout(event.target.value)} className={`${styles.text__input}`} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className={`mt-4 ${styles.upload__dp}`}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

const SecurityTab = () => {
    return (
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
    )
}

const CoursesTab = () => {
    return (
        <div className={`${styles.edit__main__container} ${styles.active_tab}`} id="courses_tab">
            <h1>Courses</h1>
            <p>You can add, edit or delete your Courses from here!</p>
            <div className={`${styles.profile__picture}`}>
                <Button className={`${styles.remove__dp}`}> <i className="fa-solid fa-plus"></i> Add Course</Button>
            </div>
            <Container className={`${styles.edit__courses__container}`}>
                <h2>Your Courses: </h2>
                {[1, 2, 4, 5, 6].map((__, index) => {
                    return (
                        <CourseCard key={index} />
                    )
                })}
            </Container>
        </div>
    )
}


const CourseCard = () => {
    const router = useRouter();
    return (
        <div>
            <Card className={`${styles.coursecard}`} onClick={() => router.push(`courses/falanademkana`)}>
                <Card.Body>
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
                </Card.Body>
            </Card>
        </div>
    )
}

export default edit;