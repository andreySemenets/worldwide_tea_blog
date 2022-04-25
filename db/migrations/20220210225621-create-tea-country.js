'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TeaCountries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tea_id: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references: {
          model: 'Teas',
          key: 'id'
        }
      },
      country_id: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references: {
          model: 'Countries',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TeaCountries');
  }
};
