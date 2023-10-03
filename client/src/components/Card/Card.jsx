import React from 'react';
import { Link } from 'react-router-dom';
//import ratingImg from '../../assets/img/rating.png';
//import style from './Card.module.css';

const Card = ({ id, background_image, name, genres, rating }) => {
  return (
    //link me lleva a los detalles del videojuego
    <Link to={`/videogames/${id}`}> 
    <div>
      <img src={background_image} alt='description'/>
      <h1>{name}</h1>
      <h3>{genres}</h3>
      <h3>Rating:{rating}</h3>
    </div>
    </Link>
  );
};

//Card renderiza una tarjeta que muestra información básica sobre un videojuego

export default Card;