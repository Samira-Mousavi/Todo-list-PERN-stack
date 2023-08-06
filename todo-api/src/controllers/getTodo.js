const Todos = require('../models').Todos;

module.exports = (req, res) => {
	return Todos.findAll({
		include: [
			{ model: Todos, as: 'subTasks' }
		], where: {
			parentId: null
		}
	})// it responds back to the client with the result of these operations in the form of a JSON response
		.then(todos => res.status(200).send({ success: true, data: { todos } }))
		.catch(err => res.status(400).send(err))
}