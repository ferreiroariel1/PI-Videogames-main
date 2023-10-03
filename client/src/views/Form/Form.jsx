import React from 'react';
import CreateGame from '../../components/CreateGame/CreateGame';
import style from './form.module.css';
import NavBar from '../../components/NavBar/NavBar';

const Form = () => {
  return (
    <div className={style.formContainer}>
      <NavBar />
        <CreateGame />
    </div>
  );
};

export default Form;