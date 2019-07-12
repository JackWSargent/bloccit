'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });
    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };
  Post.prototype.getPoints = function(){
        if(!this.votes) { 
          //console.log("is undefined"); 
          return 0; }
        return this.votes
          .map((v) => { return v.value })
          .reduce((prev, next) => { return prev + next });
  };
  Post.prototype.hasUpVoteFor = function(id){
    let vote = this.votes;
    return vote.userId === id && vote.value === 1; 
  };
  Post.prototype.hasDownVoteFor = function(id){
    let vote = this.votes;
    return vote.userId === id && vote.value === -1; 
  };
  return Post;
};