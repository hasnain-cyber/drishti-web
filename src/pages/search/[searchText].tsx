import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query';
import styles from '../../styles/search.module.css';

enum TAB_MODES {
    ALL = 'all',
    PROFESSORS = 'professors',
    COURSES = 'courses'
}

export default function search() {
    const [searchVal, setSearchVal] = React.useState('');
    const router = useRouter();
    const [searchText, setSearchText] = React.useState<string>('');
    useEffect(() => {
        if (router.isReady) {
            setSearchText(router.query['searchText'] as string);
        }
    }, [router]);
    const { data: searchResults, status: searchStatus } = useQuery(['search', searchText], async () => {
        if (searchText.length > 0) {
            const res = await fetch(`/api/search?searchText=${searchText}`);
            return res.json();
        }
    });

    const [userSearchResults, setUserSearchResults] = useState([]);
    const [courseSearchResults, setCourseSearchResults] = useState([]);
    useEffect(() => {
        if (searchResults) {
            setUserSearchResults(searchResults.users);
            setCourseSearchResults(searchResults.courses);
        }
    }, [searchResults])

    const handleClearBtn = () => {
        setSearchVal('');
    }

    const [tabMode, setTabMode] = React.useState(TAB_MODES.ALL);

    return (
        <div>
            <div className={styles.search_container}>
                <Container>
                    <div className={styles.hero__search}>
                        <input type="text" className={styles.hero__search__input} placeholder="Search for a Course" value={searchVal} onChange={(event) => setSearchVal(event.target.value)} />
                        <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={handleClearBtn}></i>
                        <button className={styles.hero__search__btn} onClick={handleClearBtn}>Search</button>
                    </div>
                </Container>
            </div>
            <Container className='mb-3'>
                <div className={styles.search__results}>
                    <h1>Found <span className={styles.search__data}>{searchStatus === 'success' ? userSearchResults.length + courseSearchResults.length : 0}</span> Search Results Matching <span className={styles.search__data}>{searchText}</span></h1>
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
                {searchStatus === 'loading' ? <div>Loading...</div> : <></>}
                {searchStatus === 'success' && (tabMode === TAB_MODES.ALL || tabMode === TAB_MODES.PROFESSORS) ? <div>{userSearchResults.map((element) => element['name'])}</div> : <></>}
                {searchStatus === 'success' && (tabMode === TAB_MODES.ALL || tabMode === TAB_MODES.COURSES) ? <div>{courseSearchResults.map((element) => element['name'])}</div> : <></>}
                {searchStatus === 'error' ? <div>Error loading the results...</div> : <></>}
            </Container>
        </div>
    )
}
