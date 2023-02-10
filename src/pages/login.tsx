import Link from 'next/link'
import React from 'react'
import { Container, Col } from 'react-bootstrap'
import styles from './../styles/login.module.css'

export default function login() {
    return (
        <div className={styles.login}>
            <div className={styles.overlay} />
            <Container className={`m-auto ${styles.container}`}>
                <Col sm={12} md={8} lg={8} className={styles.title}>
                    <h1>educate.</h1>
                    <h1>enlighten.</h1>
                    <h1>evolve.</h1>
                </Col>
                <Col sm={12} md={4}className={styles.login_card}>
                    <div className={styles.login_card_title}>Sign In</div>
                    <div className={styles.login_card_body}>
                        <div className={styles.login_card_body_input}>
                            <i className="fas fa-user me-3" />
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className={styles.login_card_body_input}>
                            <i className="fas fa-lock me-3" />
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className={styles.forgot}>
                            <Link href="/forgot-password">Forgot Password?</Link>
                        </div>
                        <div className={styles.sign}>
                            <button className={styles.loginbutton}>Sign In</button>
                        </div>
                        <div className={styles.signup}>
                            <Link href="/signup">Don't Have An Account?</Link>
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
