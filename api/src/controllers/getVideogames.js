const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;


//OBTIENE LA INFO DE JUEGOS DE UNA API
//SE USA EL MAP PARA PROCESAR LOS DATOS DE LA API. CADA ELEMENTO e EN urlData.data.results SE TRANSFORMA EN UN OBJETO CON PROPIEDADES ESPECIFICAS
//LOS GUARDA EN UN ARRAY

const getApiInfo = async () => {
  let gamesArr = [];
  let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`;

  try {
    for (let i = 0; i < 5; i++) {
      const urlData = await axios.get(urlApi);
      const apiVideogamesRaw = urlData.data.results;

      // Filtrar y agregar juegos únicos a gamesArr
      apiVideogamesRaw.forEach((e) => {
        if (!gamesArr.some((game) => game.id === e.id)) {
          gamesArr.push({
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map((platform) => platform.platform.name),
            genres: e.genres.map((genre) => genre.name),
          });
        }
      });

      urlApi = urlData.data.next;
    }

    return gamesArr;
  } catch (error) {
    console.log("Error en getApiInfo", error);
  }
};

// Resto del código de la función getVideogames permanece sin cambios


//BUSCA TODOS LOS VIDEOJUEGOS Y TAMBIEN RECUPERA LOS NOMBRES DE LOS GENEROS ASOCIADOS A ESOS VIDEOJUEGOS
//findAll: permite realizar consultas para recuperar todos los registros de una tabla en una base de datos 
const getDbInfo = async () => {
  const GamesdB = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });


  //HACE LOS MISMO QUE getApiInfo
//SE USA EL MAP PARA PROCESAR LOS DATOS DE la base de datos. CADA ELEMENTO e EN urlData.data.results SE TRANSFORMA EN UN OBJETO CON PROPIEDADES ESPECIFICAS
//LOS GUARDA EN UN ARRAY
  const newGamedB = await GamesdB.map((e) => {
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      background_image: e.background_image,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms,
      genres: e.genres.map((el) => el.name),
      createInDb: e.createInDb,
    };
  });
  return newGamedB;
};


//RUTA 1: OBTENER TODOS LOS JUEGOS

const getVideogames = async (req, res) => {
  console.log("estos son los juegos")
   try {
     const apiInfo = await getApiInfo();
     const dbInfo = await getDbInfo();
     //caso: existen juegos creados en la base de datos
     if (dbInfo) {
       const infoTotal = [...apiInfo, ...dbInfo];
       
       return res.status(200).json(infoTotal);    
     }
     //caso: no existen juegos creados en la base de datos
     let infoTotal2 = [...apiInfo];
     return res.status(200).json(infoTotal2);
   
   } catch (error) {
     return res.status(400).send(error);
   }
 
 };





//OBTENER LOS JUEGOS POR NOMBRE
const getGamesByName = async (req, res) => {
  console.log("TRAJO LOS JUEGOS POR NOMBRE");
  const { name } = req.query;

  if (typeof name !== "string" || !name) {
    return res.status(401).send("Name debe ser un string!");
  }

  try {
    // Convierte el nombre a minúsculas
    const nameLower = name.toLowerCase();

    // Realiza una llamada a la API externa para obtener juegos
    const apiGames = await getApiInfo();

    // Realiza una consulta a la base de datos local para obtener juegos
    const dbGames = await getDbInfo();

    // Combina los juegos de la API y de la base de datos
    const allGames = [...apiGames, ...dbGames];

    // Filtra los juegos por nombre
    const filteredGames = allGames.filter((game) =>
      game.name.toLowerCase().includes(nameLower)
    );

    // Comprueba si se encontraron juegos
    if (filteredGames.length === 0) {
      return res.status(404).send("No se encontraron juegos que coincidan.");
    } else if (filteredGames.length > 15) {
      // Si hay más de 15 juegos, devuelve los primeros 15
      const slicedGames = filteredGames.slice(0, 15);
      return res.status(200).json(slicedGames);
    } else {
      // Si hay 15 o menos juegos, devuelve todos
      return res.status(200).json(filteredGames);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
};






//ruta id

const getVideogameById = async (req, res) => {
  const { id } = req.params;
  console.log("ruta id funciona bien");

  try {
    //caso: id no es un numeor por lo tanto es un uuid y eso quiere decir que es un juego de la base de datos
    if (isNaN(id)) {
      const game = await Videogame.findByPk(id, { include: Genre });
      return res.status(200).json(game);
    } else {
      // caso:id es un numero por lo tanto el juego esta en api
      const gameApi = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const result = {
        id: gameApi.data.id,
        name: gameApi.data.name,
        description: gameApi.data.description,
        background_image: gameApi.data.background_image,
        released: gameApi.data.released,
        genres: gameApi.data.genres.map((gen) => gen.name),
        rating: gameApi.data.rating,
        platforms: gameApi.data.platforms.map((el) => el.platform.name),
      };
      console.log("RUTA ID FUNCIONA", result);
      return res.status(200).json(result);
    }

  } catch (error) {
    return res.status(400).send("hubo un error ruta 3");
  }
};





module.exports = {
  getVideogames,
  getVideogameById,
  getGamesByName,
};
