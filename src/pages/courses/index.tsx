import CourseCardComponent from '@/frontend/components/CourseCardComponent/CourseCardComponent'
import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../../styles/courses.module.css'
import useGlobalCourses from '@/frontend/hooks/useGlobalCourses'

export default function index() {
    const { courses } = useGlobalCourses();

    return (
        <div className={`${styles.courses__body}`}>
            <div className={`${styles.top__container}`}>
                <h1>Courses</h1>
            </div>
            <Container className={`py-5 d-flex flex-wrap justify-content-between`}>
                {courses ?
                    courses.map((course, index) => {
                        return (
                            <CourseCardComponent key={index} courseId={course.id} />
                        )
                    })
                    :
                    <h1>No Courses Available</h1>
                }
            </Container>
        </ div>
    )
}
