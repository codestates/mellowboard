'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

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

    json() {
      return {
        id: this.id,
        account: this.account,
        email: this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }

    setPassword(password) {
      this.password = bcrypt.hashSync(password, 10);
    }

    isRight(password) {
      if(this.password === bcrypt.hashSync(password, 10)) return true
      return false;
    }
  };

  // unique column: email - email로 로그인하기 때문이다.
  User.init({
    account: {
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