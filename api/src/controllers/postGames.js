const { Videogame, Genre } = require('../db');
const { Op } = require("sequelize");

const newGame = async (req, res) => {
  
    try {
      const { name, image, description, release, rating, plataforms, genres } = req.body;

    if(!name || !description)
    return res.status(404).send("Creacion cancelada por falta de informacion!");

    let newGame = await Videogame.create({
      name, image, description, release, rating, plataforms
    });
   

    const genInDb = await Genre.findAll({
      where: {
        name: {
        [Op.in]: genres ? genres : [],
        },
      },
    });

   await newGame.addGenres(genInDb);

    return res.status(202).json({data:newGame, msg:'New game created'});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error creating game');
  }
}

module.exports = {
  newGame
};