import { useRouter } from 'next/router';
import React, { useState, FormEventHandler } from 'react'
import { Form } from 'react-bootstrap';
import styles from './HeroComponent.module.css'

export default function HeroComponent() {
    const [search, setSearch] = useState('');

    const handleClearBtn = () => {
        setSearch('');
    }

    const router = useRouter();
    const handleSubmitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        router.push(`/search/${search}`);
    }


    return (

        <div className={styles.hero} >
            <div className={styles.hero__content}>
                <h1 className={styles.hero__title}>Drishti</h1>
                <p className={styles.hero__text}>Excel · Lead · Be extraordinary · Be known</p>
                <div className={styles.hero__search}>
                    <Form className='d-flex align-items-center w-100' onSubmit={handleSubmitForm}>
                        <Form.Control required type="text" className={styles.hero__search__input} placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
                        <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={handleClearBtn}></i>
                        <button type='submit' className={styles.hero__search__btn}>Search</button>
                    </Form>
                </div>

            </div>
        </div>
    )
}
