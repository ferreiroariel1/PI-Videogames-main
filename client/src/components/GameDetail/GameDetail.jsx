import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearDetail, getGameDetail } from '../../redux/actions/actionCreators';
import style from './GameDetail.module.css';
import DetailLoader from '../DeatilLoader/DetailLoader';
import NavBar from '../NavBar/NavBar';

const GameDetail = () => {
  const params = useParams();
  const game = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetail(params.idVideogame));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, params.idVideogame]);

  return (
    <div className={style.fondo}>
      <div className={style.detailContainer}>
       
        <NavBar />
        
        {game && game.name ? (
          <div className={style.secondContainer}>
            <div>
              <img src={game.background_image} alt="" className={style.imageDetail} />
              <h1>{game.name}</h1>
              <p dangerouslySetInnerHTML={{ __html: game.description }} className={style.description} />
            </div>
            
            {game.platforms && game.platforms && (
           <h2 className={style.gamePlatforms}>Available at: {game.platforms.join(", ")}</h2>)}

             {game.genres && game.genres.length > 0 && (
           <h2>Game Genres: {game.genres.map((genre) => genre.name).join(', ')}</h2>)}

            <h2 className={style.gameRating}>Average rating: {game.rating}</h2>
            <h3 className={style.gameReleased}>Released at: {game.released}</h3>
            <p className={style.id}>Game number: {game.id}</p>
          </div>
        ) : (
          <DetailLoader />
        )}
      </div>
    </div>
  );
};

export default GameDetail;
