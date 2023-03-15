import searchHandler from '@/apiHandlers/searchHandler';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap'
import { useQuery } from 'react-query';
import styles from '../styles/search.module.css';

enum TAB_MODES {
    ALL = 'all',
    PROFESSORS = 'professors',
    COURSES = 'courses'
}

export default function search() {
    const [searchVal, setSearchVal] = React.useState('');
    const router = useRouter();
    const { data: searchResults, status: searchStatus } = useQuery(['search', router.query['searchText']], async () => {
        const results = await searchHandler.findMatches(router.query['searchText'] as string);
        return results;
    }, {
        enabled: !!router.query['searchText'],
    });

    const [userSearchResults, setUserSearchResults] = useState([]);
    const [courseSearchResults, setCourseSearchResults] = useState([]);
    useEffect(() => {
        if (searchResults && searchResults.users && searchResults.courses) {
            setUserSearchResults(searchResults.users);
            setCourseSearchResults(searchResults.courses);
        }
    }, [searchResults])

    const [tabMode, setTabMode] = React.useState(TAB_MODES.ALL);

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        router.push(`/search?searchText=${searchVal}`);
    }

    return (
        <div>
            <div className={styles.search_container}>
                <Container>
                    <div className={styles.hero__search}>
                        <Form className='d-flex align-items-center w-100' onSubmit={handleSubmitForm}>
                            <Form.Control type="text" className={styles.hero__search__input} placeholder="Search" value={searchVal} onChange={(event) => setSearchVal(event.target.value)} />
                            <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={() => setSearchVal('')}></i>
                            <button type="submit" className={styles.hero__search__btn}>Search</button>
                        </Form>
                    </div>
                </Container>
            </div>
            <Container className='mb-3'>
                <div className={styles.search__results}>
                    <h1>Found <span className={styles.search__data}>{searchStatus === 'success' ? userSearchResults.length + courseSearchResults.length : 0}</span> Search Results Matching <span className={styles.search__data}>{router.query['searchText']}</span></h1>
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
