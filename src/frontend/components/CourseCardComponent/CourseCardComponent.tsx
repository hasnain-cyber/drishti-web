import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import styles from './CourseCard.module.css'

export default function CourseCardComponent() {
  return (
    <div>
      <Card className={styles.courseCard}>
        <Card.Img variant="top" src="./assets/graphics/course.jpg" />
        <Card.Body>
          <Card.Text>
            <div className={`${styles.tag} d-flex align-items-center gap-2 mb-2`}>
              <p>Marketing</p>
              <Badge bg="success">New</Badge>
            </div>
            <div className={`${styles.title} my-3`}>
              <h3>How To Create A Marketing Plan</h3>
            </div>
            <div className={`mb-2 ${styles.result__instructor}`}>Uploaded By: <span>Dr. Anubhav Singh Bassi</span></div>
            <div className={`d-flex flex-wrap justify-content-between align-items-center my-2`}>
              <div className={`d-flex align-items-center gap-2`}>
                <i className="fas fa-layer-group"></i>
                12 Lessons
                </div>
                <div className={`d-flex align-items-center gap-2`}>
                <i className="fas fa-clock"></i>
                3 hr 23 min
                </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
