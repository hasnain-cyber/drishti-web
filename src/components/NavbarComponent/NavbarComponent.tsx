import styles from './NavbarComponent.module.css';
import NavLink from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar bg="light" expand="lg" fixed='top'>
            <Container>
                <Navbar.Brand as={NavLink} href="/" className={styles.navhome}>DRISHTI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex align-items-center me-auto">
                        <Nav.Link as={NavLink} href="/" className={styles.navhover}>Home</Nav.Link>
                        <Nav.Link as={NavLink} href="#link" className={styles.navhover}>Link</Nav.Link>
                    </Nav>
                    <Nav className='d-flex align-items-center'>
                        <Nav.Link as={NavLink} href="/signup" className={styles.navhover}>Sign Up</Nav.Link>
                        <NavLink href="/login"><Button className={`mx-2 ${styles.loginbutton}`}>Login</Button></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;