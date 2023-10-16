import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'; // Importa estilos desde un archivo CSS



export default function Card({ id, background_image, name, genres, rating }) {
  return (
    <Link to={`/videogames/${id}`} className={styles.card}>
      <div>
      
        <img src={background_image} alt={`Background of ${name}`} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.genres}>
          <h3>Genres:{genres}</h3>
        </div>
        <div><h4 className={styles.rating}>{rating}</h4></div>
      </div>
    </Link>
  );
}
