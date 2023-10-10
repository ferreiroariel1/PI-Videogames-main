import React from 'react';
import style from './HomeLoader.module.css';

const HomeLoader = () => {
  return (
    <div className={style.loader}>
      <div className={style.circle}></div>
    </div>
  );
};

export default HomeLoader;
