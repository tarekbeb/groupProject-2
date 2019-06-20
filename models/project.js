'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    pName: DataTypes.STRING,
    description: DataTypes.STRING,
    summary: DataTypes.STRING,
    industryID: DataTypes.INTEGER
  }, {freezeTableName: true});
  project.associate = function(models) {
    // associations can be defined here
    models.user.belongsToMany(models.project, {through: models.userproject})
    models.project.belongsTo(models.industry, {foreignKey: 'industryID'})
  };
  return project;
};