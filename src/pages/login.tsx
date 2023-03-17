import React, { FormEventHandler, useState } from 'react';
import Link from 'next/link'
import { Container, Col, Form } from 'react-bootstrap'
import styles from './../styles/login.module.css'
import { useRouter } from 'next/router';
import useAuth from '@/frontend/hooks/useAuth';

export default function login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const user = await login({ email, password });
        router.push(`/users/${user.id}`);
    }

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
                    <Form onSubmit={handleSubmitForm}>
                        <div className={styles.login_card_title}>Sign In</div>
                        <div className={styles.login_card_body}>
                            <div className={styles.login_card_body_input}>
                                <i className="fas fa-envelope me-3" />
                                <Form.Control required type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className={styles.login_card_body_input}>
                                <i className="fas fa-lock me-3" />
                                <Form.Control required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
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
                    </Form>
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
