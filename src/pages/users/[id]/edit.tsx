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