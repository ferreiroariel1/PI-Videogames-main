const { Videogame, Genre } = require('../db');
const { Op } = require("sequelize");

const newGame = async (req, res) => {
  try {
    const { name, background_image, description, released, rating, platforms, genres } = req.body;

    if (!name || !description)
      return res.status(404).send("Creación cancelada por falta de información!");

    // Crear un nuevo juego
    let newGame = await Videogame.create({
      name, background_image, description, released, rating, platforms
    });

    // Buscar los géneros en la base de datos
    const genInDb = await Genre.findAll({
      where: {
        name: {
          [Op.in]: genres ? genres : [],
        },
      },
    });

    // Asociar los géneros al nuevo juego
    await newGame.addGenres(genInDb);

    return res.status(202).json({ data: newGame, msg: 'New game created' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error creating game');
  }
}

module.exports = {
  newGame
};