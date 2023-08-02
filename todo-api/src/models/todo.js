'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Todos, {
				onDelete: 'CASCADE',
				foreignKey: {
					name: 'parentId',
					allowNull: true
				},
				as: 'subTasks'
			})
		}
	};
	Todo.init({
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		parentId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Todos',
				key: 'parentId'
			}
		}, status: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false
		}
	}, {
		sequelize,
		modelName: 'Todos',
	});
	return Todo;
};