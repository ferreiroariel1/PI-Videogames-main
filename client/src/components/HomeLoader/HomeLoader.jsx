import React from 'react';
import style from './HomeLoader.module.css';

const HomeLoader = () => {
  return (
    <div className={style.spinner}>
    <div className={style.spinner1}></div>
</div>
  );
};

export default HomeLoader;