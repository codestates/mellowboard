'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id"
      });
      this.hasMany(models.Comment, {
        foreignKey: "post_id"
      })
      this.belongsToMany(models.Hashtag, {through: "PostTags"})
    }
  };
  Post.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: DataTypes.TEXT,
    background: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};