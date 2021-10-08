'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
      this.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
      
    }
  };

  // unique column: email - email로 로그인하기 때문이다.
  User.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};