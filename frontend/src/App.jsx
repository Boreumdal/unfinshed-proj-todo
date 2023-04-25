import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Local } from './pages'

const App = () => {
	return (
		<div className='w-screen h-screen'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/local/*' element={<Local />} />
			</Routes>
		</div>
	)
}

export default App