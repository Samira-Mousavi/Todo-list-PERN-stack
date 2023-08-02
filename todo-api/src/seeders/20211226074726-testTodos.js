'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('Todos', [{
      title: 'Learning JavaScript'
    }, {
      title: 'Washing Clothes'
    }, {
      title: 'Buying a washing machine!',
      parentId: 2
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
