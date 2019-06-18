'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    field: DataTypes.STRING
  }, {timestamps: false,
    freezeTableName: true});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};