import React, { ChangeEvent } from 'react'
import { Container } from 'react-bootstrap'
import styles from './../styles/search.module.css'

export default function search() {
  const [searchVal, setSearchVal] = React.useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  }

  const handleClearBtn = () => {
    setSearchVal('');
  }
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
      <Container>
        <div className={styles.search__results}>
          <h1>Found <span className={styles.search__data}>125</span> Search Results Matching <span className={styles.search__data}>"web development"</span></h1>
        </div>
        <div className="d-flex flex-wrap gap-3">
          <div className={`${styles.search__filter} `}>
            All
          </div>
          <div className={`${styles.search__filter} ${styles.active__filter}`}>
            Professors
          </div>
          <div className={styles.search__filter}>
            Courses
          </div>
        </div>
      </Container>
    </div>
  )
}
