import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'; // Importa estilos desde un archivo CSS

const Card = ({ id, background_image, name, genres, rating }) => {
  return (
    <Link to={`/videogames/${id}`} className={styles.card}>
      <div>
        <img src={background_image} alt={`Background of ${name}`} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.genres}>
          <h3>Genres:</h3>
          <p>{genres.join(', ')}</p>
        </div>
        <div className={styles.rating}>
          <h3>Rating:</h3>
          <p>{rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
