// import { useMemo } from 'react'

// const useSortAndFilterTodos = (todos, sortOrder, searchValue) => {
// 	const sortedTodos = useMemo(() => {
// 		let filteredTodos = todos

// 		if (searchValue) {
// 			filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()))
// 		}

// 		if (sortOrder === 'asc') {
// 			return filteredTodos.slice().sort((a, b) => a.title.localeCompare(b.title))
// 		} else if (sortOrder === 'desc') {
// 			return filteredTodos.slice().sort((a, b) => b.title.localeCompare(a.title))
// 		} else {
// 			return filteredTodos
// 		}
// 	}, [todos, sortOrder, searchValue])

// 	return sortedTodos
// }

// export default useSortAndFilterTodos
// -----------------
import { useMemo, useState, useEffect } from 'react'

const useDebouncedSortAndFilterTodos = (todos, sortOrder, searchValue, delay) => {
	const [debouncedSortOrder, setDebouncedSortOrder] = useState(sortOrder)
	const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSortOrder(sortOrder)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [sortOrder, delay])

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchValue(searchValue)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [searchValue, delay])

	const sortedAndFilteredTodos = useMemo(() => {
		let filteredTodos = todos

		if (debouncedSearchValue) {
			filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
		}

		if (debouncedSortOrder === 'asc') {
			return filteredTodos.slice().sort((a, b) => a.title.localeCompare(b.title))
		} else if (debouncedSortOrder === 'desc') {
			return filteredTodos.slice().sort((a, b) => b.title.localeCompare(a.title))
		} else {
			return filteredTodos
		}
	}, [todos, debouncedSortOrder, debouncedSearchValue])

	return sortedAndFilteredTodos
}

export default useDebouncedSortAndFilterTodos
