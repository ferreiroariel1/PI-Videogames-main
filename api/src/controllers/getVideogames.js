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
    const urlData = await axios.get(urlApi);
    urlData.data.results.map((e) => {
      gamesArr.push({
        id: e.id,
        name: e.name,
        image: e.background_image,
        release: e.release,
        rating: e.rating,
        platforms: e.platforms.map((e) => e.platform.name),
        genres: e.genres.map((e) => e.name),
      });
    });
    urlApi = urlData.data.next;

    return gamesArr;
  } catch (error) {
    console.log("Error en getApiInfo", error);
  }
};

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
      image: e.image,
      release: e.release,
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
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    //caso: existen juegos creados en la base de datos
    if (dbInfo) {
      const infoTotal = [...apiInfo, ...dbInfo];
      
      return res.status(200).json(infoTotal);    
    }
    //caso: no existen juegos creados en la base de datos
    let infoTotal2 = [...apiInfo]
    
    return res.status(200).json(infoTotal2);
  
  } catch (error) {
    return res.status(400).send(error);
  }

};


//OBTENER LOS JUEGOS POR NOMBRE
const getGamesByName = async (req, res) => {
  const { name } = req.query;
  
  if(!name.typeof === "string" || !name ){
    return res.status(401).send("Name debe ser un string!")
  }

  try {
    //toLowerCase: convierte todo el string en minuscula
    const name2 = name.toLowerCase();
    const apiInfo = await getApiInfo();
    if (!apiInfo) {
      return res.status(404).send("no se encontraron juegos en la api!!")
    };
    const dbInfo = await getDbInfo();
    
    const allJuegos = [...apiInfo, ...dbInfo];
    
    //filter:el metodo filter se utiliza en arrays. agarra cada elemnto dentro del array y aplica, usando una funcion flecha, un filtro en el cual el parametro va a ser cada elemento del array, y lo va a analizar 1 a la vez.
    const filtrados = allJuegos.filter(  (juego) => juego.name.includes(name2)  );
    //caso: no se encontraron juegos con el string name2 en su propiedad .name
    if (filtrados.length === 0 ) {
      return res.status(404).send("No se encontraron juegos que coincidan!");
    } else if(filtrados.length > 15){
      //caso: se encontraron los juegos, pero hay mas de 15 resultados por lo tanto devolvemos los primeros 15
      let cortado = filtrados.slice(0, 15);
      return res.status(200).json(cortado);
    } 
    //caso: se encontrar los juegos y no son mas 15
    return res.status(200).json(filtrados);
    
      
  } catch (error) {
    return res.status(400).send('error')
  }
   
};


//ruta id

const getVideogameById = async (req, res) => {
  const { id } = req.params;

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
        image: gameApi.data.background_image,
        release: gameApi.data.release,
        genres: gameApi.data.genres.map((gen) => {
          return { id: gen.id, name: gen.name };
        }),
        rating: gameApi.data.rating,
        platforms: gameApi.data.platforms.map((el) => el.platform.name),
      };
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
