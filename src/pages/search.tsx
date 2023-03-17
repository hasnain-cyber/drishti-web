import useCourses, { CourseType } from '@/frontend/hooks/useCourses';
import useUsers, { UserType } from '@/frontend/hooks/useUsers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import styles from '../styles/search.module.css';

enum TAB_MODES {
  ALL = 'all',
  PROFESSORS = 'professors',
  COURSES = 'courses'
}

export default function search() {
  const [searchVal, setSearchVal] = useState('');
  const router = useRouter();
  const searchText = router.query['searchText'] as string;
  const [searchResults, setSearchResults] = useState<{
    users: UserType[],
    courses: CourseType[],
  }>({ users: [], courses: [] });
  const { courses, coursesStatus } = useCourses();
  const { users, usersStatus } = useUsers();
  useEffect(() => {
    if (searchText && searchText.length > 0) {
      let courseSearchResults: CourseType[] = [];
      if (coursesStatus === 'success' && courses) {
        courseSearchResults = courses.filter((element) => element['name'].toLowerCase().includes(searchText.toLowerCase()));
      }

      let userSearchResults: UserType[] = [];
      if (usersStatus === 'success' && users) {
        userSearchResults = users.filter((element) => element['name'].toLowerCase().includes(searchText.toLowerCase()));
      }
      setSearchResults({
        users: userSearchResults,
        courses: courseSearchResults,
      });
    }
  }, [courses, coursesStatus, users, usersStatus, searchText]);

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
              <Form.Control required type="text" className={styles.hero__search__input} placeholder="Search" value={searchVal} onChange={(event) => setSearchVal(event.target.value)} />
              <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={() => setSearchVal('')}></i>
              <button type="submit" className={styles.hero__search__btn}>Search</button>
            </Form>
          </div>
        </Container>
      </div>
      <Container className='mb-3'>
        <div className={styles.search__results}>
          <h1>Found <span className={styles.search__data}>{searchResults.users.length + searchResults.courses.length}</span> Search Results Matching <span className={styles.search__data}>"{router.query['searchText']}"</span></h1>
        </div>
        {
          searchResults.users.length > 0 || searchResults.courses.length > 0 ?
            <div className={`d-flex flex-wrap gap-3 ${styles.filters}`}>
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
            :
            <></>
        }
      </Container>
      <Container className={`d-flex flex-wrap justify-content-center`}>
        {usersStatus === 'loading' || coursesStatus === 'loading' ?
          // render 6 dummy SkeletonCards
          // <>
          // {[...Array(6)].map((_, index) => {
          //   return (
          //     <div><SkeletonCard nullId='555' /></div>
          //   )
          // })}
          // </>
          "Loading..."
          : 
          <></>
          }
        {usersStatus === 'success' && (tabMode === TAB_MODES.ALL || tabMode === TAB_MODES.PROFESSORS) ?
          searchResults.users.length > 0 || tabMode === TAB_MODES.ALL ?
            <div>{searchResults.users.map((element) => <UserCard key={element['id']} userId={element['id']} />)}</div>
            :
            <div className={styles.no__results}>No Proffessors Found</div>
          : <></>}
        {coursesStatus === 'success' && (tabMode === TAB_MODES.ALL || tabMode === TAB_MODES.COURSES) ?
          searchResults.courses.length > 0 || tabMode === TAB_MODES.ALL ?
            [...Array(5)].map((_, index) => {
              return (
                <div>{searchResults.courses.map((element) => <CourseCard key={element['id']} courseId={element['id']} />)}</div>
              )
            })
            :
            <div className={styles.no__results}>No Courses Found</div>
          :
          <></>}
        {usersStatus === 'error' || coursesStatus === 'error' ? <div>Error loading the results...</div> : <></>}
      </Container>
    </div>
  )
}

const CourseCard = (props: {
  courseId: string,
}) => {
  const { courses, coursesStatus } = useCourses();
  const [course, setCourse] = useState<CourseType | null>(null);
  useEffect(() => {
    if (courses) {
      const course = courses.find((element) => element.id === props.courseId);
      // assign null again if course is not found.
      setCourse(course || null);

    }
  }, [courses]);

  const router = useRouter();
  return (
    <div>
      {course ?
        <Card className={`${styles.coursecard}`} onClick={() => router.push(`courses/${props.courseId}`)} role={'button'}>
          <Card.Body>
            <Card.Text>
              <div className={`d-flex`}>
                <div className={styles.avatar}><i className="fa-solid fa-book-open"></i></div>
                <div className={styles.result__content}>
                  <div className={styles.result__title}>{course['name']}</div>
                  <div className={styles.result__subtitle}>{course['description']}</div>
                  <div className={styles.result__instructor}>Uploaded By: <span>{course['ownerId']}</span></div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        :
        ''
      }
    </div>
  )
}

const UserCard = (props: {
  userId: string,
}) => {
  const { users, usersStatus } = useUsers();
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    if (users) {
      const user = users.find((element) => element.id === props.userId);
      // assign null again if user is not found.
      setUser(user || null);
    }
  }, [users]);

  const router = useRouter();
  return (
    <div>
      {user ?
        <Card className={`${styles.coursecard}`} onClick={() => router.push(`users/${props.userId}`)} role={'button'}>
          <Card.Body>
            <Card.Text>
              <div className={`d-flex`}>
                <div className={styles.avatar}><i className="fa-solid fa-user"></i></div>
                <div className={styles.result__content}>
                  <div className={styles.result__title}>{user['name']}</div>
                  {/* <div className={styles.result__subtitle}>{course['description']}</div> */}
                  <div className={styles.result__instructor}>Department: <span>{user['department']}</span></div>
                  <div className={styles.result__instructor}>Email ID: <span>{user['email']}</span></div>
                  <div className={styles.result__instructor}>Professor ID: <span>{user['id']}</span></div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        :
        ''
      }
    </div>
  )
}

const SkeletonCard = (props: {
  nullId: string,
}) => {
  return (
    <Card className={`${styles.coursecard} ${styles.skeleton_card}`}>
      <Card.Body>
        <Card.Text>
          <div className={`d-flex`}>
            <div className={`${styles.avatar}`}>
              <div className={`${styles.skeleton} ${styles.skeleton_avatar}`} />
            </div>
            <div className={`${styles.result__content}`}>
              <div className={`${styles.result__title}`}>
                <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
                <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
              </div>
              <div className={`${styles.result__subtitle}`}>
                <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
                <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
                <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
                <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
              </div>
              <div className={`${styles.result__instructor}`}><div className={`${styles.skeleton} ${styles.skeleton_text}`} /></div>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
