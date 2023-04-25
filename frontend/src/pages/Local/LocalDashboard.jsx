import React, { useState, useEffect } from 'react'
import { BsFillGearFill, BsPlusLg } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import AddTodo from './AddTodo'

const LocalDashboard = () => {
	const [tasks, setTasks] = useState([])
	const [addTodoToggle, setAddTodoToggle] = useState(true)

	useEffect(() => {
		const localStored = localStorage.getItem('p1project')
		if (localStored){
			setTasks(JSON.parse(localStored))
		} else {
			localStorage.setItem('p1project', '[]')
		}
	}, [])

	return (
		<>
			<div className='w-screen h-screen'>
				<div className='w-[30%] bg-accent-1 h-screen p-4 text-white'>
					<div className='flex items-center justify-between'>
						<h1 className='font-bold text-3xl text-white'>TodoList</h1>
						<div className='flex gap-3'>
							<button onClick={() => setAddTodoToggle(true)} className='bg-[#ffffff2d] hover:bg-[#ffffff4a] duration-200 text-white text-xl p-2 rounded-md'><GoPlus /></button>
							<button onClick={() => console.log(tasks)} className='bg-[#ffffff2d] hover:bg-[#ffffff4a] duration-200 text-white text-xl p-2 rounded-md'><BsFillGearFill /></button>
						</div>
					</div>
					<div className='h-[60%] flex flex-col mt-8'>
						<div className='flex items-center h-[22px]'>
							<h1 className='w-1/5 font-medium pb-1'>To be done</h1>
							<div className='w-4/5 h-[1px] bg-white rounded-md'></div>
						</div>
						<div className='flex flex-col h-auto gap-1 todo-item-list p-1 overflow-x-hidden overflow-y-auto'>
							<div className='grid grid-cols-[65%_auto] items-center bg-[#ffffff2d] py-2 px-3 gap-1 h-[36px] rounded'>
								<p className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a autem odio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, error fuga doloribus repudiandae odit veritatis ipsam in necessitatibus.</p>
							</div>
						</div>
					</div>
					<div className='h-auto flex flex-col mt-8'>
						<div className='flex items-center h-[22px]'>
							<h1 className='w-1/5 font-medium pb-1'>Action Tab</h1>
							<div className='w-4/5 h-[1px] bg-white rounded-md'></div>
						</div>
						<div className='flex flex-col h-auto gap-1 todo-item-list p-1 overflow-x-hidden overflow-y-auto'>

						</div>
					</div>
				</div>
				<div>

				</div>
			</div>
			{
				addTodoToggle && <AddTodo setAddTodoToggle={setAddTodoToggle} />
			}
		</>

	)
}

export default LocalDashboard