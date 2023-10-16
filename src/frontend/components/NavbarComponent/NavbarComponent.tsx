import styles from './NavbarComponent.module.css';
import NavLink from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import useAuth from '@/frontend/hooks/useAuth';

const NavbarComponent = () => {
    const { userData, logout } = useAuth();

    const handleClickLogout = () => {
        logout();
    }

    return (
        <Navbar bg="light" expand="lg" sticky='top'>
            <Container>
                <Navbar.Brand as={NavLink} href="/" className={styles.navhome}>ISHIKSHA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex align-items-center me-auto">
                        <Nav.Link as={NavLink} href="/" className={styles.navhover}>Home</Nav.Link>
                        <Nav.Link as={NavLink} href="/courses" className={styles.navhover}>Courses</Nav.Link>
                    </Nav>
                    <Nav className='d-flex align-items-center'>
                        {userData === null ?
                            <>
                                <Nav.Link as={NavLink} href="/signup" className={styles.navhover}>Sign Up</Nav.Link>
                                <NavLink href="/login"><Button className={`mx-2 ${styles.loginbutton}`}>Login</Button></NavLink>
                            </>
                            :
                            <>
                                <Nav.Link as={NavLink} href={`/users/${userData.id}`} className={styles.navhover}>My Profile</Nav.Link>
                                <Button className={`mx-2 ${styles.loginbutton}`} onClick={handleClickLogout}>Logout</Button>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
