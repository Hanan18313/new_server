'use strict';
var fs = require('fs');
var Sequelize = require('sequelize');

exports.sequelize = function () {
	var config = JSON.parse(fs.readFileSync('./config.json').toString());
	return new Sequelize(
		'wx_node', 
		config.mysql_user, 
		config.mysql_password, 
		{
			dialect: 'mysql',
			host: config.mysql_host,
			port:3306, 
			pool: {
				max: 10,
				min: 0,
				idle: 10000
			},
			logging:false,
		}
	);
}