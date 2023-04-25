import React, { useState, useEffect } from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import { useTodos } from '../../data/context/TodosContext'

const LocalDashboard = () => {
	const {tasks, setTasks, colums, setColumns} = useTodos()
	const [addColumnToggle, setAddColumnToggle] = useState(true)
	const [addColumn, setAddColumn] = useState('')

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
	}, [])

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
									<div key={idx}>
										<div className='flex items-center justify-between font-medium'>
											<h3>{ task }</h3>
											<button>+</button>
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
		</>
	)
}

export default LocalDashboard