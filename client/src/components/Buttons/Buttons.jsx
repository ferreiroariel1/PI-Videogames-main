import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllGames } from '../../redux/actions/actionCreators';
import { Link } from 'react-router-dom';
import style from './Buttons.module.css';

const Buttons = () => {
    const dispatch = useDispatch();


    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getAllGames());
      };//previene el comportamiento predeterminado de recargar la página. y luego me obtiene todos los juegos


  return (
    <div className={style.buttonsContainer}>
        <button onClick={(event) => handleClick(event)}>Reload Games</button>
      
        <button><Link to='/home'>Home</Link></button>
        
        <button><Link to='/form'>Create a New Game</Link></button>
        
    </div>
  );
};

export default Buttons;