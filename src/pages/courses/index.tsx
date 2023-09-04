import CourseCardComponent from '@/frontend/components/CourseCardComponent/CourseCardComponent'
import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../../styles/courses.module.css'

export default function index() {
    return (
        <div className={`${styles.courses__body}`}>
            <div className={`${styles.top__container}`}>
                <h1>Courses</h1>
            </div>
            <Container className={`py-5 d-flex flex-wrap justify-content-between`}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                        return (
                            <CourseCardComponent key={index} />
                        )
                    })
                }
            </Container>
        </ div>
    )
}