import Context from '../store/Context';
import React, { useState, useContext, useEffect } from 'react';
import { Collapse, Card, CardBody, CardHeader, Input, Button, Form, FormGroup, Label } from 'reactstrap'

const TodoList = ({ todos, updateTodoStatus }) => {
	const [index, setIndex] = useState(0)
	const contextState = useContext(Context);

	function toggle(newIndex) {
		if (newIndex === index) {
			setIndex(-1);
		} else {
			setIndex(newIndex);
		}
	}

	const [inputText, setInputText] = useState('')

	const handleInputSubmit = (parentId) => {
		contextState?.createTodo(inputText, parentId)

		setInputText('')
	}

	return <div style={{
		display: 'flex',
		flexDirection: 'column',
		width: '60%'
	}}>
		{todos?.map((todo, key) =>
			<Form key={key}>
				<Card style={{ marginBottom: '0rem', borderBottom: 'none' }} key={todo?.id}>
					<CardHeader className="accordionToggle" onClick={() => toggle(todo?.id)} data-event={todo?.id}>
						<FormGroup
							check
							inline
						>
							<Input type="checkbox" className="statusCheckBox" checked={todo?.status} onClick={(e) => updateTodoStatus(todo?.id, todo?.status, todo?.id, e)} />
							<Label check>
								{todo?.title}
							</Label>
						</FormGroup>

						<div>
							<p>{todo.count} of {todo?.subTasks ? todo?.subTasks.length : 0} Completed</p>
						</div>
					</CardHeader>
					<Collapse isOpen={index === todo?.id}>
						<CardBody className="tasksList">
							{
								todo?.subTasks?.length > 0 ?
									todo?.subTasks?.map((task, index) =>
										<FormGroup
											check
											key={index}
											style={{
												borderBottom: '1px solid #ccc'
											}}
											onClick={(e) => updateTodoStatus(task?.id, task?.status, null, e)}
										>
											<Input type="checkbox" className="statusCheckBox" checked={task.status} />
											<Label check>
												{task.title}
											</Label>
										</FormGroup>
									) :
									<p>No steps yet. Add Some!</p>
							}
						</CardBody>
						<div className="addTodoList" style={{ marginBottom: '25px' }}>
							<Input value={inputText} className="inputText" onChange={(e) => setInputText(e.target.value)} />

							<Button
								color="primary"
								className="inputButton"
								onClick={() => handleInputSubmit(todo?.id)}
								disabled={inputText.length < 1}

							>
								New Step
							</Button>
						</div>
					</Collapse>
				</Card>
			</Form>
		)
		}
	</div> // UI HERE
}

export default TodoList;