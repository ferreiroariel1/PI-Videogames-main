import axios from 'axios';
//import { URL_BASE } from '../../utils/index';
import { GET_ALL_GAMES,
         ERROR,
         GET_GAME_BY_NAME,
         FILTER_BY_CREATION,
         FILTER_BY_GENRE,
         ORDER_BY_NAME,
         ORDER_BY_RATING,
         GET_GAME_DETAIL,
         CLEAR_DETAIL,
         GET_ALL_GENRES,
         POST_NEW_GAME } from './actionstypes';
 


// JUEGOS
//obtiene los videojuegos del (backend)
export const getAllGames = () => {
    return async (dispatch) => {
        try {
            await axios.get("http://localhost:3001/videogames")
            .then((res) => {
                return dispatch({ type: GET_ALL_GAMES, payload: res.data })
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    };
};
  


//obtiene los videojuegos por nombre del backend
//directamente de la api https://api.rawg.io/api/games?search={game}
export const getGameByName = (name) => {
    return async (dispatch) => {
        try {
            const game = await axios.get(`http://localhost:3001/videogames/name?name=${name}`);
            const response = game.data;
            return dispatch({ type: GET_GAME_BY_NAME, payload: response });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    };
};

//obtiene los videojuegos por id del backend
//directamente de la api https://api.rawg.io/api/games/{id}
export const getGameDetail = (idVideogame) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${idVideogame}`);
            const game = response.data;
            return dispatch({ type: GET_GAME_DETAIL, payload: game });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    };
};



export const clearDetail = () => {
    return { type: CLEAR_DETAIL};
};

//crea los videojuegos por el backend
export const postNewGame = (game) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/videogames" , game);
            return dispatch({ type: POST_NEW_GAME, payload: response });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    };
};



// GENEROS
//obtiene los generos del backend
//directamente de la api https://api.rawg.io/api/genres
export const getAllGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/genres');
            const genres = response.data;
            return dispatch({ type: GET_ALL_GENRES, payload: genres });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message
            });
        }
    };
};




// FILTROS Y ORDENAMIENTO

export const filterByCreation = (creation) => {
    return { type: FILTER_BY_CREATION, payload: creation };
};


export const filterByGenre = (genre) => {
    return { type: FILTER_BY_GENRE, payload: genre };
};


export const orderByName = (orderName) => {
    return { type: ORDER_BY_NAME, payload: orderName };
};



export const orderByRating = (orderRating) => {

    return { type: ORDER_BY_RATING, payload: orderRating };
};