module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('players', 'role', {
      type: Sequelize.ENUM('Owner', 'Admin', 'Staff', 'Player'),
      allowNull: false,
      defaultValue: 'Player'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('players', 'role');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_players_role";');
  }
};
