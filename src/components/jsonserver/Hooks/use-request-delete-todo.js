import { useState } from 'react'

export const useRequestDeleteTodo = refreshTodos => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = id => {
		setIsDeleting(true)

		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'DELETE'
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача удалена, ответ сервера:', response)
				refreshTodos()
			})
			.finally(() => setIsDeleting(false))
	}

	return {
		isDeleting,
		requestDeleteTodo
	}
}
