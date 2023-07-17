import styles from './Jsonserver.module.css'
import { useEffect, useState } from 'react'

function Jsonserver() {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)

	useEffect(() => {
		setIsLoading(true)
		fetch('http://localhost:3004/todos/')
			.then(loadedData => loadedData.json())
			.then(loadedTodos => {
				setTodos(loadedTodos)
			})
			.finally(() => setIsLoading(false))
	}, [refreshTodosFlag])

	const requestUpdateTodos = id => {
		setIsUpdating(true)

		fetch('http://localhost:3004/todos/1', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'update task',
				completed: 'true'
			})
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача обновлена, ответ сервера:', response)
				refreshTodos()
			})
			.finally(() => setIsUpdating(false))
	}

	const requestDeleteTodos = id => {
		setIsDeleting(true)

		fetch('http://localhost:3004/todos/201', {
			method: 'DELETE'
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача удалена, ответ сервера:', response)
				refreshTodos()
			})
			.finally(() => setIsDeleting(false))
	}

	const requestAddTodos = () => {
		setIsCreating(true)
		fetch('http://localhost:3004/todos/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Новый таск',
				completed: 'false'
			})
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача добавлена, ответ сервера:', response)
				refreshTodos()
			})
			.finally(() => setIsCreating(false))
	}
	return (
		<div className={styles.todos}>
			<h1 className={styles.todoHeader}>JSON Server</h1>
			{/* Отрисовка задач по условию загрузки */}
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title, completed }, index) => (
					<div
						key={id}
						className={
							completed
								? styles.todo + ' ' + styles.done
								: styles.todo + ' ' + styles.process
						}
					>
						<div className={styles.todoNumber}>{index + 1}</div>
						<div className={styles.todoTitle}>{title}</div>
					</div>
				))
			)}
			{/* Отрисовка кнопок по условию загрузки */}
			{isLoading ? (
				<div></div>
			) : (
				<div>
					<button onClick={requestAddTodos} disabled={isCreating}>
						New Todos
					</button>
					<button onClick={requestUpdateTodos} disabled={isUpdating}>
						Update todos
					</button>
					<button onClick={requestDeleteTodos} disabled={isDeleting}>
						Delete todos
					</button>
				</div>
			)}
		</div>
	)
}

export default Jsonserver
//  json-server --watch db.json --port 3004 --delay 2000
