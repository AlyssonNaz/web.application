'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        queryInterface.addColumn(
            'tb_user',
            'context_id',
            {
                type: Sequelize.UUID,
                allowNull: false,
                caption: "Contexto",
                defaultValue: 'd7f960c0-7e10-11e6-9280-b747f09f49fc',
                readOnly: false,
                references: {model: 'tb_context', key: "id"}
            }
        )
    },

    down: function (queryInterface, Sequelize) {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
    }
};
