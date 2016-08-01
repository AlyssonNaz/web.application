var fs = require('fs');

module.exports = {
	sync: function (Seq, sequelize, models) {
		models.create(Seq, sequelize);

		sequelize
			.sync()
			.then(function (err) {
				console.log('Modelos sincronizados.');
			}, function (err) {
				console.log('An error occurred while creating the table:', err);
			});
	}
}