'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
      static associate(models) {
        this.belongsToMany(models.Tea,{
          through: models.TeaCountry,
          foreignKey: 'country_id',
        })
        }
  }
  Country.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};
