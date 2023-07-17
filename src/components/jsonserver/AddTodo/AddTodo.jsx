import { faArrowDownAZ, faArrowUpZA, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { Row, Col, Button, FormControl } from 'react-bootstrap'
import s from './AddTodo.module.css'
import { useContext } from 'react'
import { AppContext } from '../Context'

const AddTodo = () => {
	const [valueInput, setValueInput] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

	const { isCreating, requestAddTodo, handleSortOrderChange, setSearchValue } = useContext(AppContext)

	const handleSortClick = () => {
		if (sortOrder === 'asc') {
			setSortOrder('desc')
			handleSortOrderChange('desc')
		} else {
			setSortOrder('asc')
			handleSortOrderChange('asc')
		}
	}

	return (
		<Row>
			<Col className={s.AddTodoForm}>
				<FormControl
					className={s.formControl}
					size='lg'
					type='text'
					placeholder='Введите задачу'
					value={valueInput}
					onChange={e => {
						setValueInput(e.target.value)
						setSearchValue(e.target.value)
					}}
				/>
				<Button
					className={s.btn}
					onClick={() => {
						requestAddTodo(valueInput)
						setValueInput('')
						setSearchValue('')
					}}
					disabled={!valueInput || isCreating}
				>
					Добавить
				</Button>
				<div className={s.sortAZ}>
					<Button className={s.btn} onClick={handleSortClick}>
						<FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUpZA : faArrowDownAZ} />
					</Button>
					<Button className={s.btn} onClick={() => handleSortOrderChange(null)}>
						<FontAwesomeIcon icon={faHistory} />
					</Button>
				</div>
			</Col>
		</Row>
	)
}

export default AddTodo
