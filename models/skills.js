'use strict';
module.exports = (sequelize, DataTypes) => {
  const skills = sequelize.define('skills', {
    skillName: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {timestamps: false,
    freezeTableName: true});
  skills.associate = function(models) {
    // associations can be defined here
    models.user.belongsToMany(models.skills, {through: models.userSkills})
  };
  return skills;
};