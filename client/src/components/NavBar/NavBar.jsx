import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filters/Filter';
import style from './NavBar.module.css'
import Buttons from '../Buttons/Buttons';
import { useLocation } from 'react-router-dom';


const NavBar = ({ setPagina, setInputP, handleChangeByName, handleChangeByRating, handleChangeCreation, handleChangeGenres, genres }) => {
  const { pathname } = useLocation();

  return (
    <div className={style.navContainer}>
      <Buttons />
      {
        pathname === '/home' && 
        <div className={style.filAndOrd}>

          <Filter setPagina={setPagina} setInputP={setInputP} handleChangeByName={handleChangeByName} handleChangeByRating={handleChangeByRating} handleChangeCreation={handleChangeCreation} handleChangeGenres={handleChangeGenres}  genres={genres}/>
          <SearchBar setPagina={setPagina} setInputP={setInputP} />
        </div>
      }   
    </div>
  );
};

export default NavBar;