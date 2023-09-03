import React, { FormEventHandler, useState } from 'react';
import Link from 'next/link'
import { Container, Col, Form } from 'react-bootstrap'
import styles from './../styles/login.module.css'
import { useRouter } from 'next/router';
import useAuth from '@/frontend/hooks/useAuth';

export default function login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            const response = await login({ email, password });
            if (response) {
                router.push(`/users/${response.user.id}`);
            }
        } catch (error) {
            console.log("🚀 ~ file: login.tsx:48 ~ handleSubmitForm ~ error", error);
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.overlay} />
            <Container className={`m-auto ${styles.container}`}>
                <Col sm={12} md={6} lg={8} className={styles.title}>
                    <h1>Connect</h1>
                    <h1>Play</h1>
                    <h1>Learn</h1>
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
                                <Form.Control
                                    required
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                {/* Toggle show/hide password icon */}
                                <i
                                    className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle showPassword state on click
                                    style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
                                />
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
                </Col>
            </Container>
        </div>
    )
}
