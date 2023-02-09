import styles from './NavbarComponent.module.css';

const NavbarComponent = () => {
    return (
        <div>
            <h1 className={`text-center ${styles.mainContainer}`}>
                Navbar
            </h1>
            <h1>Random</h1>
        </div>
    );
};

export default NavbarComponent;