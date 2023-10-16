import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCreation, filterByGenre, getAllGames, getAllGenres, orderByName, orderByRating } from '../../redux/actions/actionCreators'
import NavBar from '../NavBar/NavBar';
import style from './HomeContent.module.css';
import Paginado from '../Paginado/paginado.jsx';
import Card from '../Card/Card'
import HomeLoader from '../HomeLoader/HomeLoader.jsx'


const HomeContent = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const genres = useSelector((state) => state.genres);

  const [ pagina, setPagina ] = useState(1);
  const [ porPagina, setPorPagina ] = useState(15);
  const [ inputP, setInputP ] = useState(1);
  const[ order, setOrder ] = useState('');
  const currentGames = allGames.slice((pagina -1) * porPagina, (pagina - 1) * porPagina + porPagina);

  const maximo = Math.ceil(allGames.length / porPagina);


  useEffect(() => {
    if (!allGames.length) {
      dispatch(getAllGames());
    }
    dispatch(getAllGenres());
  },[dispatch, allGames]);


  //manejadores de eventos
  const handleChangeByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setPagina(1);
    setInputP(1);
    setOrder(`Order by ${event.target.value}`);
  };

  const handleChangeByRating = (event) => {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
    setPagina(1);
    setInputP(1);
    setOrder(`Order by ${event.target.value}`);
  };


  const handleChangeCreation = (event) => {
    event.preventDefault();
    dispatch(filterByCreation(event.target.value));
    setPagina(1);
    setInputP(1);
  };
  

  const handleChangeGenres = (event) => {
    event.preventDefault()
    dispatch(filterByGenre(event.target.value));
    setPagina(1);
    setInputP(1);
  };

 

  return(
    <>
    <NavBar setPagina={setPagina} setInputP={setInputP} handleChangeByName={handleChangeByName} handleChangeByRating={handleChangeByRating} handleChangeCreation={handleChangeCreation} handleChangeGenres={handleChangeGenres}  genres={genres}/>

    <Paginado maximo={maximo} pagina={pagina} setPagina={setPagina} inputP={inputP} setInputP={setInputP} className={style.paginado}/>
    
    <div className={style.cardsContainer}>
  {
   currentGames.length?
   currentGames.map((game) => {
      return (
        <div key={game.id} className={style.eachCard}>
          <Card
            id={game.id}
            background_image={game.background_image}
            name={game.name}
            genres={game && game.genres ? game.genres.join(', ') : ''}
            rating={game.rating}
          />
        </div>
      );
    }) : <HomeLoader />
  }
</div>

         
      </>
  );
};

export default HomeContent;
