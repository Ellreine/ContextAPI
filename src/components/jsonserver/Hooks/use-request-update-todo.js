import { useState } from 'react'

export const useRequestUpdateTodo = refreshTodos => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = (id, completed, title) => {
		setIsUpdating(true)

		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: title,
				completed: completed
			})
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача обновлена, ответ сервера:', response)
				refreshTodos()
			})
			.finally(() => setIsUpdating(false))
	}

	return {
		isUpdating,
		requestUpdateTodo
	}
}
