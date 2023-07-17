import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Jsonplaceholder from './components/Jsonplaceholder/Jsonplaceholder'
// import Jsonserver from './components/jsonserver/Jsonserver'

import TodoApp from './components/jsonserver/TodoApp'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		{/* <Jsonplaceholder /> */}
		{/* <Jsonserver /> */}
		<TodoApp />
	</React.StrictMode>
)
