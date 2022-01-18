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
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade"
      });
      this.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "cascade"
      })
    }
  };
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};