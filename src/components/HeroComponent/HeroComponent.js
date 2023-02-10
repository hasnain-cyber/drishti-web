import React from 'react'
import styles from './HeroComponent.module.css'

export default function HeroComponent() {
    const [searchVal, setSearchVal] = React.useState('');

    const handleInput = (e) => {
        setSearchVal(e.target.value);
    }

    const handleClearBtn = () => {
        setSearchVal('');
    }
    return (

        <div className={styles.hero} >
            <div className={styles.hero__content}>
                <h1 className={styles.hero__title}>Drishti</h1>
                <p className={styles.hero__text}>Excel · Lead · Be extraordinary · Be known</p>
                <div className={styles.hero__search}>
                    <input type="text" className={styles.hero__search__input} placeholder="Search for a Course" value={searchVal} onChange={handleInput} />
                    <i className={`fa-solid fa-xmark ${styles.hero__clear__btn}`} onClick={handleClearBtn}></i>
                    <button className={styles.hero__search__btn} onClick={handleClearBtn}>Search</button>
                </div>

            </div>
        </div>
    )
}
