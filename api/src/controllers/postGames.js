const { Videogame, Genre } = require('../db');
const { Op } = require("sequelize");

const newGame = async (req, res) => {
    try {
      const { name, background_image, description, released, rating, plataforms, genres } = req.body;

    if(!name || !description)
    return res.status(404).send("Creacion cancelada por falta de informacion!");

    let newGame = await Videogame.create({
      name, background_image, description, released, rating, plataforms
    });
   

   const genInDb = await Genre.findAll({
      where: {
        name: {
        [Op.in]: genres ? genres : [],
        },
      },
    });
    
    

   await newGame.addGenres(genInDb);
   console.log("EXPLICACION",genInDb);
   console.log(newGame);
   
    return res.status(202).json({data:newGame, msg:'New game created'});
  } catch (error) {
    console.log(error)
    return res.status(500).send('Error creating game');
  }
}

module.exports = {
  newGame
};