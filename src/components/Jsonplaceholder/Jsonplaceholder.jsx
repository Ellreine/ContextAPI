import styles from './Jsonplaceholder.module.css'
import { useEffect, useState } from 'react'

function Jsonplaceholder() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(loadedData => loadedData.json())
			.then(loadedProducts => {
				setProducts(loadedProducts)
			})
	}, [])
	return (
		<div className={styles.todos}>
			<h1 className={styles.todoHeader}>JSON Placeholder</h1>
			{products.map(({ id, title, completed }, index) => (
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
			))}
		</div>
	)
}

export default Jsonplaceholder
