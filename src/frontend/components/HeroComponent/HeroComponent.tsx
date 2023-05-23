import { useRouter } from 'next/router';
import React, { useState, FormEventHandler } from 'react'
import { Form } from 'react-bootstrap';
import styles from './HeroComponent.module.css'

export default function HeroComponent() {
    const [searchVal, setSearchVal] = useState('');

    const router = useRouter();
    const handleSubmitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        router.push(`/search?searchText=${searchVal}`);
    }


    return (

        <div className={styles.hero} >
            <div className={styles.hero__content}>
                <h1 className={styles.hero__title}>iShiksha Simulator</h1>
                <p className={styles.hero__text}>Gamification Platform for Teachers and Learners</p>
                <div className={styles.hero__search}>
                    <Form className='d-flex align-items-center w-100' onSubmit={handleSubmitForm}>
                        <Form.Control required type="text" className={styles.hero__search__input} placeholder="Available Learning Modules" value={searchVal} onChange={(event) => setSearchVal(event.target.value)} />
                        <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={() => setSearchVal('')}></i>
                        <button type='submit' className={styles.hero__search__btn}>Search</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
