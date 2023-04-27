import React, { useState, useEffect } from 'react'
import { BsFillGearFill, BsBox, BsBoxSeam, BsTrashFill, BsStarFill, BsStar, BsThreeDots, BsCheckLg, BsArrowCounterclockwise, BsFillPersonFill, BsWrench, BsCaretUpFill } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'
import { FaStickyNote, FaStar } from 'react-icons/fa'
import { useTodos } from '../../data/context/TodosContext'
import AddTaskModal from './AddTaskModal'
import { toast } from 'react-toastify'
import DisplayTask from './DisplayTask'

const LocalDashboard = () => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

	const {tasks, setTasks, colums, setColumns} = useTodos()

	const [time, setTime] = useState('')
	const [today, setToday] = useState('')
	const [day, setDay] = useState('')
	const [tooltip, setTooltip] = useState('')
	const [destinationColumn, setDestinationColumn] = useState('')
	const [addColumn, setAddColumn] = useState('')
	const [addColumnToggle, setAddColumnToggle] = useState(false)

	const [openedData, setOpenedData] = useState({})
	const [openedDataToggle, setOpenedDataToggle] = useState(false)

	const handleAddColumn = e => {
		setAddColumn(e.target.value)
	}

	const handleAddColumnSubmit = () => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))

		if (localStored.columns.indexOf(addColumn) === -1){
			localStorage.setItem('p1project', JSON.stringify({ ...localStored, columns: [...localStored.columns, addColumn] }))

			setAddColumn('')
			setAddColumnToggle(false)
			fetchLocalstorage()
		} else {
			toast.error('Column already exists')
		}
	}

	const fetchLocalstorage = () => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))

		if (localStored){
			setTasks(localStored)
		} else {
			localStorage.setItem('p1project', JSON.stringify({columns: [], tasks: [] }))
		}
	}

	const removeMark = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks[indexOfTarget].marks.marked = !localStored.tasks[indexOfTarget].marks.marked

		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		fetchLocalstorage()
	}

	const deleteTask = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks[indexOfTarget].marks.deleted = true

		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		fetchLocalstorage()
	}

	const doneTask = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks[indexOfTarget].status = 'done'

		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		fetchLocalstorage()
	}

	const undoDoneTask = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks[indexOfTarget].status = 'todo'

		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		fetchLocalstorage()
	}

	const currentDate = () => {
		const date = new Date()
			
		const calendar = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
		const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
		const year = date.getFullYear()

		const hour = date.getHours() < 13 ? date.getHours() : date.getHours() - 12
		const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
		const meridiem = date.getHours() < 12 && date.getHours() > 24  ? 'AM' : 'PM' 
		
		setDay(days[date.getDay()])

		setTime(`${hour}:${minute} ${meridiem}`)
		setToday(`${year}-${month}-${calendar}`)
	}

	useEffect(() => {
		currentDate()

		setInterval(() => {
			currentDate()
		}, 45000)

		console.log('Be advised: A function will fired every 45s for the clock');
	}, [])

	useEffect(() => {
		fetchLocalstorage()
	}, [destinationColumn])

	return (
		<>
			<div className='hidden md:flex justify-between text-[#232931]'>
				<div className='w-[28%] h-screen p-5'>
					<div className='flex flex-col gap-5 w-full h-full drop-shadow-lg rounded-lg py-5 px-5 bg-[#f8f8f8] overflow-hidden'>

						<div className='h-[38px] flex items-center justify-between'>
							<h1 className='text-3xl font-bold'>TodoList</h1>
							<div className='flex items-center gap-3'>
								<button onClick={() => setAddColumnToggle(!addColumnToggle)} className='text-xl bg-[#393E46] text-white rounded-md h-[32px] aspect-square flex items-center justify-center'>{ addColumnToggle ? <RxCross2 /> : <GoPlus />}</button>
								<button onClick={() => console.log(tasks)} className='text-xl bg-[#393E46] text-white rounded-md h-[32px] aspect-square flex items-center justify-center'><BsFillGearFill /></button>
							</div>
						</div>
						{
							addColumnToggle && (
								<div className='absolute inset-0 grid place-items-center z-50'>
									<div className='absolute bg-white shadow-md w-[260px] flex flex-col gap-2 rounded-md'>
										<h1 className='text-xl font-medium mx-4 pt-4 pb-2 border-b'>Add a column</h1>
										<div className='flex flex-col items-center justify-between gap-3 px-5 py-3'>
											<input type="text" name='column' className='h-[38px] px-3 border bg-gray-50 shadow-sm w-full block rounded' value={addColumn} onChange={handleAddColumn} placeholder='Column name...' />
											<div className='flex justify-end w-full'>
												<button onClick={() => setAddColumnToggle(false)} className='h-[32px] w-[72px] px-4 flex items-center justify-center gap-1 rounded hover:text-blue-400 hover:brightness-95 duration-200 disabled:brightness-90 disabled:bg-[#383838] disabled:cursor-not-allowed font-medium'>Cancel</button>
												<button onClick={handleAddColumnSubmit} className='h-[32px] w-[72px] bg-[#4ECCA3] px-4 flex items-center justify-center gap-1 rounded text-white hover:brightness-95 duration-200 disabled:brightness-90 disabled:bg-[#383838] disabled:cursor-not-allowed font-medium'>
													<GoPlus />
													<span>Add</span>
												</button>
											</div>
										</div>
									</div>
									<div onClick={() => setAddColumnToggle(false)} className='bg-[#9595952d] w-full h-full'></div>
								</div>
							)
						}
						<div className='h-full overflow-y-auto flex flex-col gap-2 task-list-nav px-1'>
							{
								tasks.columns && tasks.columns.length > 0 ? (
									tasks.columns.map((task, idx) => (
										<div key={idx} className=' flex flex-col gap-2 bg-white rounded-sm shadow-sm py-3 px-3'>
											<div className='flex items-center justify-between font-medium px-2 py-1'>
												<h3>{ task }</h3>
												<button onClick={() => setDestinationColumn(task)}><GoPlus /></button>
											</div>
											<div className='flex flex-col gap-2 overflow-y-auto'>
												{
													tasks.tasks.filter(todo => todo.column === task).length > 0 ? tasks.tasks.filter(todo => todo.column === task && !todo.marks.deleted).map(item => (
															<div key={item?.id} onMouseLeave={() => setTooltip('')} className={(item?.status !== 'todo' && 'opacity-40 line-through') + ' flex items-center gap-2 h-[28px] px-2 hover:bg-[#f8f8f8] duration-300 rounded-sm relative task-item'}>
																<span>{ item?.status !== 'todo' ? <BsCheckLg /> : <BsBox />}</span>
																<p className={(tooltip === item?.id ? 'w-[54%]' : 'task-item-text w-[84%]') + ' truncate '}>{item?.title}</p>
																<div className='h-full hidden duration-200 items-center gap-1 absolute right-2 task-item-action	z-20'>
																	{
																		tooltip === item?.id && (
																			<div className='flex items-center gap-1 bg-[#f8f8f8]'>
																				<button onClick={() => deleteTask(item?.id)} className='w-[22px] hover:text-white hover:bg-[#393E46] aspect-square rounded-md grid place-items-center duration-200'><BsTrashFill /></button>
																				{
																					item?.status === 'todo'
																					? <button onClick={() => doneTask(item?.id)} className='w-[22px] hover:text-white hover:bg-[#393E46] aspect-square rounded-md grid place-items-center duration-200'><BsCheckLg /></button>
																					: <button onClick={() => undoDoneTask(item?.id)} className='w-[22px] hover:text-white hover:bg-[#393E46] aspect-square rounded-md grid place-items-center duration-200'><BsArrowCounterclockwise /></button>
																				}
																				
																				
																				<button onClick={() => removeMark(item?.id)}  className='w-[22px] hover:text-white hover:bg-[#393E46] aspect-square rounded-md grid place-items-center duration-200'>{ item?.marks.marked ? <span className='text-sunglow'><BsStarFill /></span> : <span><BsStar /></span> }</button>
																			</div>
																		)
																	}
																	<button onClick={() => item?.id === tooltip ? setTooltip('') : setTooltip(item?.id)} className='w-[22px] hover:text-white hover:bg-[#393E46] aspect-square rounded-md grid place-items-center duration-200'>{ item?.id === tooltip ? <RxCross2 /> : <BsThreeDots /> }</button>
																</div>
																{
																	tooltip !== item?.id && (
																		<div className='absolute right-2 task-mark'>
																			<span className='w-[22px] aspect-square rounded-md grid place-items-center duration-200'>{ item?.marks.marked && <span className='text-sunglow'><BsStarFill /></span> }</span>
																		</div>
																	)
																}

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
				</div>

				<div className='w-[72%] h-screen py-5 pr-5 relative'>
					<div className='h-[80px] flex items-center justify-between bg-[#f8f8f8] px-4 rounded-lg shadow-md'>
						<div className='flex flex-col font-mono'>
							{/* <h1 className='text-5xl'>{time}</h1>
							<div className='flex items-center gap-2'>
								<h1 className='text-5xl'>{ today.slice(8)}</h1>
								<div className='flex flex-col font-medium'>
									<p className='text-sm leading-5'>{ today.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{ months[+today.slice(5, 7) - 1]}</p>
								</div>
							</div> */}
							<h1 className='text-3xl font-bold'>Calendar</h1>
							<p className='text-xl font-bold'>{`${day} ${time}`}</p>
						</div>
						<button onClick={() => console.log(openedData)} className='text-sm py-1 px-3 font-bold bg-red-400 text-white rounded-md'>Debug Button</button>
					</div>
					
					<div className='h-full overflow-y-auto p-4'>
						<DisplayTask tasks={tasks} setOpenedData={setOpenedData} openedData={openedData} setOpenedDataToggle={setOpenedDataToggle} />
					</div>
					

			
					{
						openedData.id && (
							<button onClick={() => setOpenedDataToggle(!openedDataToggle)} className='absolute bottom-6 right-7 h-[38px] px-5 gap-2 text-lg bg-gray-100 rounded-lg drop-shadow-md flex items-center font-medium'>
								<span className={(openedDataToggle ? 'rotate-180' : 'rotate-0') + ' duration-300'}><BsCaretUpFill /></span>
								<span>{openedDataToggle ? 'Close Task Details' : 'Open Task Details' }</span>
							</button>
						)
					}
					{
						openedDataToggle && (
							<div className='absolute bottom-6 mb-[44px] right-7 w-[420px] bg-gray-100 p-6 rounded-lg drop-shadow-lg font-medium'>
								<h1 className='font-bold text-3xl'>Task</h1>
								<h1 className='font-bold py-2 border-b'><span className='font-medium text-gray-500'>From column </span>Title</h1>
								
								<div className='my-5 flex flex-col gap-3'>
									<div className=''>
										<h3 className='font-bold'>Title</h3>
										<p className='text-gray-500'>{ openedData.title }</p>
									</div>
									<div className=''>
										<h3 className='font-bold'>Description</h3>
										<p className='text-gray-500'>{ openedData.description }</p>
									</div>
								</div>

								<div className='mt-5 flex flex-col gap-3'>
									<div className=''>
										<h3 className='font-bold'>Due Date</h3>
										{/* 24-11 ////// 12-23 */}
										{
											openedData.dueDate !== 'No due date' ? (
												<>
													<p className='text-gray-500'>{`${ months[openedData.dueDate.slice(5, 7) - 1] } ${ openedData.dueDate.slice(8, 10) }, ${ openedData.dueDate.slice(0, 4)}` }</p>
													<p className='text-gray-500'>{`${+openedData.dueDate.slice(11, 13) > 11 && +openedData.dueDate.slice(11, 13) < 24 ? (+openedData.dueDate.slice(11, 13) - 12 < 10 ? '0' + (+openedData.dueDate.slice(11, 13) - 12) : +openedData.dueDate.slice(11, 13) - 12) + ':' + openedData.dueDate.slice(14) + ' PM' : +openedData.dueDate.slice(11, 13) + ':' + openedData.dueDate.slice(14) + ' AM'}`}</p>
												</>
											) : <p className='text-gray-500'>N/A No due date</p>
										}
									</div>
									<div className=''>
										<h3 className='font-bold'>Marks</h3>
										<div className='flex items-center gap-2'>
											<div className='text-sm py-1 px-3 bg-gray-600 w-fit text-white font-medium rounded-md flex items-center gap-1'>
												<span><FaStickyNote /></span>
												<span>Todo</span>
											</div>
											{
												openedData.marks.marked && (
													<div className='text-sm py-1 px-3 bg-gray-600 w-fit text-white font-medium rounded-md flex items-center gap-1'>
														<span><FaStar /></span>
														<span>Important</span>
													</div>
												)
											}

										</div>
									</div>
								</div>

								<div className='mt-10 grid grid-cols-3 gap-2'>
									<button className='hover:bg-[#FF6D60] bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Edit</button>
									<button className='hover:bg-emerald-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Archive</button>
									<button className='hover:bg-pink-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Delete</button>
								</div>
							</div>
						)
					}
					

				</div>
			</div>
			{
				<div className='md:hidden h-screen w-screen grid place-items-center duration-100'>
					<div className='flex flex-col gap-4'>
						<h1 className='text-xl font-mono font-bold'>For Desktop Only</h1>
						<div className='flex flex-col gap-1'>
							<button onClick={() => { location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }} className='rotate text-white font-medium bg-[#333] py-2 px-3 rounded-md w-full'>saжnu puas</button>
						</div>
					</div>
				</div>
			}
			{
				destinationColumn && <AddTaskModal destinationColumn={destinationColumn} setDestinationColumn={setDestinationColumn} />
			}
		</>
	)
}

export default LocalDashboard
