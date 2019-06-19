'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    field: DataTypes.STRING
  }, {timestamps: false,
    freezeTableName: true});
  categories.associate = function(models) {
    // associations can be defined here
    models.categories.belongsTo(models.project, {foreignKey: 'skillsID'})
    models.categories.belongsTo(models.profile, {foreignKey: 'userID'})
  };
  return categories;
};