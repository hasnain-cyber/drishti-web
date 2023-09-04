import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import styles from './CourseCard.module.css'
import { useCourseById } from '@/frontend/hooks/useCourseById';
import useUserById from '@/frontend/hooks/useUserById';
import { useRouter } from 'next/router';

export default function CourseCardComponent(props: { courseId: string }) {
  const { course } = useCourseById(props.courseId);
  const { userData } = useUserById(course ? course.ownerId : null);

  const router = useRouter();

  return (
    <Card className={styles.courseCard} onClick={() => {
      router.push(`/courses/${props.courseId}`);
    }}>
      <Card.Img variant="top" src="./assets/graphics/course.jpg" />
      <Card.Body>
        <Card.Text>
          <div className={`${styles.title} my-3`}>
            <h3>{course && course.name}</h3>
          </div>
          <div className={`mb-2 ${styles.result__instructor}`}>Uploaded By: <span>{userData && userData.name}</span></div>
          <div className={`d-flex flex-wrap justify-content-between align-items-center my-2`}>
            <div className={`d-flex align-items-center gap-2`}>
              <i className="fas fa-layer-group"></i>
              {course && course.topics.length} {course && course.topics.length === 1 ? 'Topic' : 'Topics'}
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
