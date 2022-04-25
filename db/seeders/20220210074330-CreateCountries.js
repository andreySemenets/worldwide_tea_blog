  'use strict';

  module.exports = {
    async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Countries', 
    [
      {
        name: 'Россия',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
          name: 'Китай',
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        name: 'Япония',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
        name: 'Индия',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
        name: 'Вьетнам',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
    ], 
  {}
  );

  },


    async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Countries', null, {});
    }
  };
