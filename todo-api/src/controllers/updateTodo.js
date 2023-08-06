const Todos = require('../models').Todos;
const Op = require('sequelize').Op

module.exports = (req, res) => {
	if (req.body.todo_id !== null) {
		return Todos.update(
			{ status: req.body.status },
			{
				where: {
					[Op.or]: [{ id: req.body.id }, { parentId: req.body.todo_id }]
				}
			}
			// it responds back to the client with the result of these operations in the form of a JSON response
		).then(todo => res.status(201).send({ success: true, data: { todo } }))
			.catch(err => res.status(400).send(err))
	} else {
		Todos.update(
			{ status: req.body.status },
			{ where: { id: req.body.id }, returning: true, plain: true }
		).then(todo => {
			Todos.findAll({
				where: { parentId: todo[1].dataValues.parentId }
			}).then(totalCount => {
				console.log('totalCount', totalCount.length)
				totalCount = totalCount.length
				Todos.findAll({
					where: { parentId: todo[1].dataValues.parentId, status: true }
				}).then(completedCount => {
					console.log('completedCount', completedCount.length)
					completedCount = completedCount.length
					if (totalCount === completedCount) {
						console.log('totalCount.count === completedCount.count', totalCount === completedCount)
						return Todos.update(
							{ status: true },
							{
								where: {
									[Op.or]: [{ id: todo[1].dataValues.parentId }, { parentId: todo[1].dataValues.parentId }]
								}
							}
						).then(todo => res.status(201).send({ success: true, data: { todo } }))
							.catch(err => res.status(400).send(err))
					} else {
						console.log('totalCount !== completedCount', totalCount === completedCount)

						return Todos.update(
							{ status: false },
							{ where: { id: todo[1].dataValues.parentId } }
						).then(todo => res.status(201).send({ success: true, data: { todo } }))
							.catch(err => res.status(400).send(err))
					}
				})
			}).catch(err => res.status(400).send(err))
		}).catch(err => res.status(400).send(err))
	}
}