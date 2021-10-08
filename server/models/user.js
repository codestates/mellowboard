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
        foreignKey: "user_id",
        onDelete: "cascade"
      });
      this.hasMany(models.Comment, {
        foreignKey: "user_id",
        onDelete: "cascade"
      });
    }

    json() {
      return {
        id: this.id,
        user_id: this.user_id,
        email: this.email
      }
    }
  };
  User.init({
    user_id: {
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