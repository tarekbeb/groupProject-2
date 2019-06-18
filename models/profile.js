'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    fName: DataTypes.STRING,
    lName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    skills: DataTypes.STRING,
    imgURL: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {timestamps: false,
    freezeTableName: true});
  profile.associate = function(models) {
    // associations can be defined here
  };
  return profile;
};