import React from 'react'
import s from "./Header.module.css"
import { Row, Col } from "react-bootstrap"

const Header = () => {
	return (
		<Row>
			<Col>
				<div className={s.root}>Todo List</div>
			</Col>
		</Row>
	)
}

export default Header
