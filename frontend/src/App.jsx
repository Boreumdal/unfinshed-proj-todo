import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Local } from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<div className='w-screen h-screen'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/local/*' element={<Local />} />
			</Routes>
			<ToastContainer />
		</div>
	)
}

export default App