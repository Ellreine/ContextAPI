import React from 'react'
import { useState } from 'react'
import { Row, Col, Button, FormControl } from 'react-bootstrap'
import s from './TodoList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faTrash, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AppContext } from '../Context'

const TodoList = () => {
	const [value, setValue] = useState(null)
	const [edit, setEdit] = useState(null)

	const { todos, requestDeleteTodo, isDeleting, isUpdating, requestUpdateTodo } = useContext(AppContext)

	const editTodo = (id, title) => {
		setEdit(id)
		setValue(title)
	}
	return (
		<div>
			{todos.map(({ id, title, completed }) => (
				<div key={id} className={s.listItems}>
					{edit === id ? (
						<Row>
							<Col className={s.AddTodoForm}>
								<FormControl onChange={e => setValue(e.target.value)} value={value} />
							</Col>
						</Row>
					) : (
						<div>
							<div className={completed ? s.textTitle + ' ' + s.close : s.textTitle}>{title}</div>
						</div>
					)}

					{edit == id ? (
						<div>
							<Button onClick={() => requestUpdateTodo(id, completed, value)} size='sm'>
								<FontAwesomeIcon icon={faSave} />
							</Button>
						</div>
					) : (
						<div className={s.btnItems}>
							<Button onClick={() => requestUpdateTodo(id, !completed, title)} disabled={isUpdating} size='sm'>
								{!completed ? <FontAwesomeIcon icon={faSquare} /> : <FontAwesomeIcon icon={faCheckSquare} />}
							</Button>
							<Button onClick={() => editTodo(id, title)} disabled={isUpdating} className={s.btn} size='sm'>
								<FontAwesomeIcon icon={faEdit} />
							</Button>
							<Button onClick={() => requestDeleteTodo(id)} disabled={isDeleting} size='sm' className={s.btn}>
								<FontAwesomeIcon icon={faTrash} />
							</Button>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default TodoList
