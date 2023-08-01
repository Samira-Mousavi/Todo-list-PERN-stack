import Context from '../store/Context';
import React, { useEffect, useState, useContext } from 'react';
import { Input, Button } from 'reactstrap'
import './Todos.css'
import TodoList from './TodoList';

const Todos = ({
	todos = []
}) => {
	const contextState = useContext(Context);

	useEffect(() => {
		contextState?.getAllTodos()
	}, [])

	useEffect(() => {
		console.log(contextState?.todos)
	}, [contextState?.todos ? contextState.todos : todos])

	const [inputText, setInputText] = useState('')

	const handleInputSubmit = () => {
		contextState?.createTodo(inputText, null)

		setInputText('')
	}

	const updateHandler = async (id, status, todo_id, e) => {
		await contextState?.updateTodoStatus(id, status, todo_id, e, contextState?.getAllTodos)
	}

	return <Context.Consumer>
		{context => (
			<>
				<h3 style={{
					marginTop: '50px',
				}}>Todo App</h3>

				<div className="addTodoList" style={{
					marginTop: '50px',
					marginBottom: '50px'
				}}>
					<Input value={inputText} className="inputText" onChange={(e) => setInputText(e.target.value)} />

					<Button
						color="primary"
						className="inputButton"
						onClick={() => handleInputSubmit()}
						disabled={inputText.length < 1}
					>
						New List
					</Button>
				</div>
				{
					<TodoList todos={context?.todos ? context?.todos : todos} updateTodoStatus={updateHandler} />
				}
			</>
		)}
	</Context.Consumer> // UI HERE
}

export default Todos;