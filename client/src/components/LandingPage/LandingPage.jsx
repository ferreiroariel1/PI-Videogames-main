import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={style.wrapper}>
        <button className={style.button}><Link to='/home' className={style.link}>START</Link></button>
        
    </div>
    
  );
};

export default LandingPage;