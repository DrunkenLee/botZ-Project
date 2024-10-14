const { Model, DataTypes } = require('sequelize');

class Player extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

const playerModel = (sequelize) => {
  Player.init({
    uniqueid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    steam_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    extraData: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('Owner', 'Admin', 'Staff', 'Player'),
      allowNull: false,
      defaultValue: 'Player'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    }
  }, {
    sequelize,
    modelName: 'Player',
    tableName: 'players',
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
  });

  return Player;
};

module.exports = playerModel;
