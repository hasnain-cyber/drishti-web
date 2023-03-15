import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import styles from '../../styles/search.module.css';

enum TAB_MODES {
    ALL = 'all',
    PROFESSORS = 'professors',
    COURSES = 'courses'
}

export default function search() {
    const [searchVal, setSearchVal] = React.useState('');
    const router = useRouter();
    const { searchText } = router.query;
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        
    }, [searchText])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.target.value);
    }

    const handleClearBtn = () => {
        setSearchVal('');
    }

    const [tabMode, setTabMode] = React.useState(TAB_MODES.ALL);

    return (
        <div>
            <div className={styles.search_container}>
                <Container>
                    <div className={styles.hero__search}>
                        <input type="text" className={styles.hero__search__input} placeholder="Search for a Course" value={searchVal} onChange={handleInput} />
                        <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={handleClearBtn}></i>
                        <button className={styles.hero__search__btn} onClick={handleClearBtn}>Search</button>
                    </div>
                </Container>
            </div>
            <Container className='mb-3'>
                <div className={styles.search__results}>
                    <h1>Found <span className={styles.search__data}>125</span> Search Results Matching <span className={styles.search__data}>{searchText}</span></h1>
                </div>
                <div className="d-flex flex-wrap gap-3">
                    <div className={`${styles.search__filter} ${tabMode == TAB_MODES.ALL ? styles.active__filter : ''}`} onClick={() => setTabMode(TAB_MODES.ALL)}>
                        All
                    </div>
                    <div className={`${styles.search__filter}  ${tabMode == TAB_MODES.PROFESSORS ? styles.active__filter : ''}`} onClick={() => setTabMode(TAB_MODES.PROFESSORS)}>
                        Professors
                    </div>
                    <div className={`${styles.search__filter}  ${tabMode == TAB_MODES.COURSES ? styles.active__filter : ''}`} onClick={() => setTabMode(TAB_MODES.COURSES)}>
                        Courses
                    </div>
                </div>
            </Container>
            <Container>
                Random container
            </Container>
        </div>
    )
}
