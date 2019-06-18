'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    pName: DataTypes.STRING,
    description: DataTypes.STRING,
    summary: DataTypes.STRING,
    collaborators: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    skillsID: DataTypes.INTEGER
  }, {timestamps: false,
    freezeTableName: true});
  project.associate = function(models) {
    // associations can be defined here
  };
  return project;
};