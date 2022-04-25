'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeaCountry extends Model {

  }
  TeaCountry.init({
    tea_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeaCountry',
  });
  return TeaCountry;
};
