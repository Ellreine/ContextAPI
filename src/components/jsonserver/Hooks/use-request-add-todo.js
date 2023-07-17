import { useState } from 'react'

export const useRequestAddTodo = refreshTodos => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = valueInput => {
		setIsCreating(true)
		fetch('http://localhost:3004/todos/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: valueInput,
				completed: false
			})
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача добавлена, ответ сервера:', response)
				refreshTodos()
			})
			.finally(() => setIsCreating(false))
	}

	return {
		isCreating,
		requestAddTodo
	}
}
