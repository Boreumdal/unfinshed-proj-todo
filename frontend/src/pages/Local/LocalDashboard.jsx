import React, { useState, useEffect } from 'react'
import { BsFillGearFill, BsBox, BsBoxSeam } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import { useTodos } from '../../data/context/TodosContext'
import AddTaskModal from './AddTaskModal'

const LocalDashboard = () => {
	const {tasks, setTasks, colums, setColumns} = useTodos()
	const [addColumnToggle, setAddColumnToggle] = useState(true)
	const [addColumn, setAddColumn] = useState('')
	const [destinationColumn, setDestinationColumn] = useState('')

	const handleAddColumn = e => {
		setAddColumn(e.target.value)
	}

	const handleAddColumnSubmit = () => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))

		localStorage.setItem('p1project', JSON.stringify({ ...localStored, columns: [...localStored.columns, addColumn] }))
		setAddColumn('')
		fetchLocalstorage()
	}

	const fetchLocalstorage = () => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))

		if (localStored){
			setTasks(localStored)
		} else {
			localStorage.setItem('p1project', JSON.stringify({columns: [], tasks: [] }))
		}
	}

	useEffect(() => {
		fetchLocalstorage()
	}, [destinationColumn])

	useEffect(() => {
		// if (tasks && tasks.length !== 0){
		// 	setColumns(tasks.map(task => task.column))
		// }
	}, [tasks])

	return (
		<>
			<div className='flex text-[#232931]'>
				<div className='w-[28%] h-screen p-5'>
					<div className=' w-full h-full drop-shadow-lg rounded-lg p-5 bg-[#fafafa]'>
						<div className='flex items-center justify-between'>
							<h1 className='text-3xl font-bold'>TodoList</h1>
							<div className='flex items-center gap-3'>
								<button onClick={() => setAddColumnToggle(!addColumnToggle)} className='text-xl bg-[#393E46] text-white rounded-md h-[32px] aspect-square grid place-items-center'><GoPlus /></button>
								<button onClick={() => console.log(tasks)} className='text-xl bg-[#393E46] text-white rounded-md h-[32px] aspect-square grid place-items-center'><BsFillGearFill /></button>
							</div>
						</div>
						{
							addColumnToggle && (
								<div className='flex items-center justify-between gap-2 h-[38px] mt-7'>
									<input type="text" name='column' className='h-full px-3 border shadow-sm w-full block rounded' value={addColumn} onChange={handleAddColumn} placeholder='Column name...' />
									<button className='bg-[#4ECCA3] h-full px-4 gap-1 rounded shadow-sm text-white flex items-center font-medium hover:brightness-95 duration-200' onClick={handleAddColumnSubmit}>
										<GoPlus />
										<span>Add</span>
									</button>
								</div>
							)
						}
						{
							tasks.columns && tasks.columns.length > 0 ? (
								tasks.columns.map((task, idx) => (
									<div key={idx} className='mt-4 flex flex-col gap-2 max-h-[270px] bg-white shadow-sm py-3 px-3'>
										<div className='flex items-center justify-between font-medium px-2 py-1'>
											<h3>{ task }</h3>
											<button onClick={() => setDestinationColumn(task)}><GoPlus /></button>
										</div>
										<div className='flex flex-col gap-2 overflow-y-auto'>
											{
												tasks.tasks.filter(todo => todo.column === task).length > 0 ? tasks.tasks.filter(todo => todo.column === task).map((item, idx) => (
													<div key={idx} className='flex items-center gap-2 h-[28px] px-2 hover:bg-[#f8f8f8] duration-300 rounded-sm cursor-pointer'>
														<span><BsBox /></span>
														<p className='truncate'>{item?.title}</p>
													</div>
												)) : (
													<div className='flex items-center gap-2 h-[28px] px-2 hover:bg-[#f8f8f8] duration-300 rounded-sm cursor-pointer'>
														<span><BsBoxSeam /></span>
														<p className='truncate'>No task added</p>
													</div>
												)
											}
										</div>
									</div>
								))
							) : (
								<div>
									No
								</div>
							)
						}
						
					</div>
				</div>
				<div>

				</div>
			</div>
			{
				destinationColumn && <AddTaskModal destinationColumn={destinationColumn} setDestinationColumn={setDestinationColumn} />
			}
		</>
	)
}

export default LocalDashboard