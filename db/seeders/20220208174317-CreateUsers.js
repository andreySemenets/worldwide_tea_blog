'use strict';

  module.exports = {
    async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
          name: 'Maria',
          password: '12345',
          email: 'maria@mail.ru',
          position: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
      }], {});
    
    },

    async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Users', null, {});
      
    }
  };
