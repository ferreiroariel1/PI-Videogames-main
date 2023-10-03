import React from 'react';
import style from './DetailLoader.module.css';

const DetailLoader = () => {
  return (
    
    <main className={style.container}>
        
        <div className={style.dots}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
        </div>
        <div className={style.dots2}>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
            <div className={style.dot2}></div>
        </div>
        <div className={style.circle}></div>
    </main>

  );
};


export default DetailLoader;