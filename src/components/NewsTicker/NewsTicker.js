import React from 'react'
import { Card } from 'react-bootstrap'
import styles from './NewsTicker.module.css'

export default function NewsTicker() {
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title className={styles.heading}>NEWS</Card.Title>
                    <Card.Text className={styles.scrollWrap}>
                        <div className={styles.scrollContent}>
                            <div className={styles.listItem}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci cupiditate quae voluptas?
                                <a><i className="fa-solid fa-link ms-3" />Click Here!</a>
                            </div>
                            <div className={styles.listItem}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci cupiditate quae voluptas?
                                <a><i className="fa-solid fa-link ms-3" />Click Here!</a>
                            </div>
                            <div className={styles.listItem}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci cupiditate quae voluptas?
                                <a><i className="fa-solid fa-link ms-3" />Click Here!</a>
                            </div>
                            <div className={styles.listItem}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci cupiditate quae voluptas?
                                <a><i className="fa-solid fa-link ms-3" />Click Here!</a>
                            </div>
                            <div className={styles.listItem}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci cupiditate quae voluptas?
                                <a><i className="fa-solid fa-link ms-3" />Click Here!</a>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
