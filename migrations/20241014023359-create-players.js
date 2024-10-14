'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('players', {
      uniqueid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Automatically generate UUIDs
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      steam_id: {
        type: Sequelize.STRING, // Adjust type if needed
        allowNull: true
      },
      extraData: {
        type: Sequelize.STRING, // Adjust data type depending on its content
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('players');
  }
};
