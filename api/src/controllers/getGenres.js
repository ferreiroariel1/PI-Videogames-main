const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db');

const getGenres = async (req, res) => {
    try {
        //const genres = await Genre.findAll();
        const genres = await axios.get(
            `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        const genresOk = genres.data.results
            console.log(genresOk)

        const genresMaped = await genresOk.map((genre) => ({
            name: genre.name,
        }));

        console.log(genresMaped);
        
        await genresMaped.map ((gen) => Genre.create({name: gen.name}));

        return res.status(200).send(genresMaped);
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        return res.status(500).send(error);
    }
};

module.exports = {
    getGenres,
};
