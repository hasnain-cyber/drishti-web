import Link from 'next/link'
import React, { useState, FormEventHandler } from 'react'
import { Container, Col, Form } from 'react-bootstrap'
import styles from './../styles/signup.module.css';
import { useRouter } from 'next/router';
import useAuth from '@/frontend/hooks/useAuth';

export default function signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const router = useRouter();
    const { signUp } = useAuth();

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return alert("Passwords do not match.");
        }

        try {
            const response = await signUp({ name, email, password });
            console.log("🚀 ~ file: signup.tsx:27 ~ consthandleSubmitForm:FormEventHandler<HTMLFormElement>= ~ response:", response)
            if (response) {
                router.push(`/users/${response.user.id}`);
            }
        } catch (error) {
            console.log("🚀 ~ file: signup.tsx:29 ~ consthandleSubmitForm:FormEventHandler<HTMLFormElement>= ~ error:", error)
        }
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
                        <div className={styles.login_card_title}>Sign Up</div>
                        <div className={styles.login_card_body}>
                            <div className={styles.login_card_body_input}>
                                <i className="fas fa-user me-3" />
                                <Form.Control className={styles.formControl} required type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div className={styles.login_card_body_input}>
                                <i className="fas fa-envelope me-3" />
                                <Form.Control className={styles.formControl} required type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className={styles.login_card_body_input}>
                                <i className="fas fa-lock me-3" />
                                <Form.Control className={styles.formControl} required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <div className={styles.login_card_body_input}>
                                <i className="fas fa-lock me-3" />
                                <Form.Control className={styles.formControl} required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                            </div>
                            <div className={styles.sign}>
                                <button type={'submit'} className={styles.loginbutton}>Sign Up</button>
                            </div>
                            <div className={styles.signup}>
                                Have An Account? <Link href="/login">Sign In</Link>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}