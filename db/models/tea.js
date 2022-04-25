'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
      static associate(models) {
      this.belongsToMany(models.Country,{
        through: models.TeaCountry,
        foreignKey: 'tea_id',
        otherKey: 'country_id',
        onDelete:'CASCADE',
      })
      }

  }
  Tea.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Tea',
  });
  return Tea;
};
