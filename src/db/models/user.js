'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts"
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments"
    });
    User.hasMany(models.Vote, {
      foreignKey: "userId",
      as: "votes"
    });
    User.hasMany(models.Favorite, {
      foreignKey: "userId",
      as: "favorites"
    });
  };
  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };
  return User;
};