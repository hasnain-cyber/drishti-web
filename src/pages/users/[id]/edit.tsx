import useAuth from "@/frontend/hooks/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
        const tab = document.getElementById(tabId);
        console.log(tab);
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
                    <div className={`d-flex justify-content-center ${styles.edit__sidebar__item} ${styles.save__button}`}>
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

                                <Button variant="primary" type="submit" className={`mt-4 ${styles.upload__dp}`}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
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

export default edit;