'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsTo(models.User,
        { foreignKey: {name:'user_id' },
        onDelete:'CASCADE',
        hooks: true, 
        });
      this.belongsTo(models.Tea, 
        { foreignKey: {name:'tea_id' },
        onDelete:'CASCADE',
        hooks: true, 
      });
    }
  }
  Comment.init({
    comments: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    tea_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
