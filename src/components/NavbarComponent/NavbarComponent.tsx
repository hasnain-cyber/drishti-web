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
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} href="#home" className={styles.navhover}>Home</Nav.Link>
                        <Nav.Link as={NavLink} href="#link" className={styles.navhover}>Link</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button className={styles.loginbutton}>Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;