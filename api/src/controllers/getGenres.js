const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db');

const getGenres = async (req, res) => {
    try {
        // Obtener géneros de la API Rawg
        const genres = await axios.get(
            `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        const genresOk = genres.data.results;

        const genresMaped = genresOk.map((genre) => ({
            name: genre.name,
        }));

        for (const gen of genresMaped) {
            // Verificar si el género ya existe en la base de datos
            const existingGenre = await Genre.findOne({ where: { name: gen.name } });

            if (!existingGenre) {
                // Si no existe, insertarlo en la base de datos
                await Genre.create({ name: gen.name });
            }
        }

        return res.status(200).send(genresMaped);
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        return res.status(500).send(error);
    }
};

module.exports = {
    getGenres,
};
