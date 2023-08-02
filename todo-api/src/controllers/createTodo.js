const Todos = require('../models').Todos;

module.exports = (req, res) => {
	return Todos.create({
		title: req.body.title,
		parentId: req.body.todo_id ? req.body.todo_id : null
	})
		// it responds back to the client with the result of these operations in the form of a JSON response
		.then(todo => {
			if (req.body.todo_id) {
				return Todos.update(
					{ status: false },
					{ where: { id: req.body.todo_id } }
				).then(updatedTodo => res.status(201).send({ success: true, data: { todo } }))
					.catch(err => res.status(400).send(err))
			} else {
				res.status(201).send({ success: true, data: { todo } })
			}
		})
		.catch(err => res.status(400).send(err))
}