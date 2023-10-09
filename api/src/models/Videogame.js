const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    plataforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    background_image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    released:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    rating:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createInDb: {
      // si el juego fue creado por el usuario o no
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
  },
    
  }, { timestamps: false });
};
