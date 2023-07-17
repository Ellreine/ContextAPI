import styles from './TodoApp.module.css'
import { useState } from 'react'
import AddTodo from './AddTodo/AddTodo'
import Header from './Header/Header'
import TodoList from './TodoList/TodoList'
import { useRequestAddTodo, useRequestDeleteTodo, useRequestGetTodos, useRequestUpdateTodo } from './Hooks'
import { Container } from 'react-bootstrap'
import { AppContext } from './Context'
import useDebouncedSortAndFilterTodos from './Utils.js/useSortAndFilterTodos'

function TodoApp() {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)
	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag)
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos)
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos)
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos)
	const [sortOrder, setSortOrder] = useState('asc')
	const [searchValue, setSearchValue] = useState('')
	const debouncedSortAndFilteredTodos = useDebouncedSortAndFilterTodos(todos, sortOrder, searchValue, 700)

	const handleSortOrderChange = order => {
		setSortOrder(order)
	}

	const contextData = {
		isCreating,
		requestAddTodo,
		todos: debouncedSortAndFilteredTodos,
		handleSortOrderChange,
		setSearchValue,
		requestDeleteTodo,
		isDeleting,
		requestUpdateTodo,
		isUpdating,
	}

	return (
		<Container>
			<AppContext.Provider value={contextData}>
				<Header />
				<AddTodo />
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<TodoList />
				)}
			</AppContext.Provider>
		</Container>
	)
}
export default TodoApp
//  json-server --watch db.json --port 3004 --delay 2000
