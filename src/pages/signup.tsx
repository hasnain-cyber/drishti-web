import Link from 'next/link'
import React from 'react'
import { Container, Col } from 'react-bootstrap'
import styles from './../styles/signup.module.css'

export default function signup() {
    return (
        <div className={styles.login}>
            <div className={styles.overlay} />
            <Container className={`m-auto ${styles.container}`}>
                <Col sm={12} md={6} lg={8} className={styles.title}>
                    <h1>educate.</h1>
                    <h1>enlighten.</h1>
                    <h1>evolve.</h1>
                </Col>
                <Col sm={12} md={6} lg={8} className={styles.login_card}>
                    <div className={styles.login_card_title}>Sign Up</div>
                    <div className={styles.login_card_body}>
                        <div className={styles.login_card_body_input}>
                            <i className="fas fa-user me-3" />
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className={styles.login_card_body_input}>
                            <i className="fas fa-envelope me-3" />
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className={styles.login_card_body_input}>
                            <i className="fas fa-lock me-3" />
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className={styles.sign}>
                            <button className={styles.loginbutton}>Sign Up</button>
                        </div>
                        <div className={styles.signup}>
                            Have An Account? <Link href="/login">Sign In</Link>
                        </div>
                    </div>
                    {/* Or use google login */}
                    {/* <div className={styles.login_card_footer}>
                        <div className={styles.login_card_footer_text}>
                            <span>Or use your account</span>
                        </div>
                        <div className={styles.login_card_footer_social}>
                            <i className="fab fa-google" />
                        </div>
                    </div> */}
                </Col>
            </Container>
        </div>
    )
}
