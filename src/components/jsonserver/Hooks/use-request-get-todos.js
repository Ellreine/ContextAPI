import { useEffect, useState } from 'react'

export const useRequestGetTodos = refreshTodosFlag => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch('http://localhost:3004/todos/')
			.then(loadedData => loadedData.json())
			.then(loadedTodos => {
				setTodos(loadedTodos.reverse())
			})
			.finally(() => setIsLoading(false))
	}, [refreshTodosFlag])

	return { isLoading, todos }
}
