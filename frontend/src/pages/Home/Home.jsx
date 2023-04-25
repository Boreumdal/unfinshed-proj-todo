import React from 'react'
import { Link } from 'react-router-dom'
import { BsGithub } from 'react-icons/bs'

const Home = () => {
	return (
		<div className='h-screen'>
			<div className='flex flex-col'>
				<div className='h-[90vh] flex flex-col justify-center bg-white px-12 shadow-md'>
					<h1 className='text-4xl font-medium tracking-wide'>Welcome to <span className='font-mono'>Project P1</span></h1>
					<p>The first project that you can try is my todolist. So, let's get started.</p>
					<div className='flex gap-3 items-center mt-5'>
						<Link to='login' className='border-2 border-transparent hover:brightness-95 bg-blue-theme font-medium px-5 text-center text-white py-2 rounded duration-200'>Online Database</Link>
						<Link to='local' className='border-2 border-blue-theme bg-transparent hover:bg-[#00a7fb51] font-medium px-5 text-center text-blue-theme py-2 rounded duration-200'>Localstorage Mode</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home