'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projectSkills', {
      projectId: {
        type: Sequelize.INTEGER
      },
      skillsId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projectSkills');
  }
};