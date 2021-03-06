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
        foreignKey: "userId",
        onDelete: "cascade",
      });
      this.hasMany(models.Comment, {
        foreignKey: "postId",
        onDelete: "cascade",
        as: 'comment'
      })
      this.belongsToMany(models.Hashtag, {as: 'tags', through: models.PostTags})
    }
  };
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    content: DataTypes.TEXT,
    background: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const img = this.getDataValue('background');
        return `https://cdn.gunsigi.com/mellow/background/${img}`
      },
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};