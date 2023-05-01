import React, { useState, useEffect } from 'react'
import { BsFillGearFill, BsBox, BsBoxSeam, BsTrash3, BsStarFill, BsStar, BsThreeDots, BsCheckLg, BsArrowCounterclockwise, BsSearch, BsCaretUpFill, BsFillMoonStarsFill, BsSun } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import { RxCross2, RxColorWheel } from 'react-icons/rx'
import { HiMenu, HiMenuAlt3 } from 'react-icons/hi'
import { FaStickyNote, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../../data/context/TodosContext'
import AddTaskModal from './AddTaskModal'
import { toast } from 'react-toastify'
import DisplayTask from './DisplayTask'
import OpenData from './OpenData'
import TestingOptions from './TestingOptions'
import Search from './Search'

const LocalDashboard = () => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
	const navigate = useNavigate()

	const {tasks, setTasks, colums, setColumns, light, setLight} = useTodos()

	const [time, setTime] = useState('')
	const [today, setToday] = useState('')
	const [day, setDay] = useState('')
	const [tooltip, setTooltip] = useState('')
	const [destinationColumn, setDestinationColumn] = useState('')
	const [addColumn, setAddColumn] = useState('')
	const [addColumnToggle, setAddColumnToggle] = useState(false)
	const [menu, setMenu] = useState(false)

	const [openedDataId, setOpenedDataId] = useState('')
	const [openedDataToggle, setOpenedDataToggle] = useState(false)
    const [editDateToggle, setEditDateToggle] = useState(false)

	const [editingDataId, setEditingDataId] = useState('')
	const [editingDataToggle, setEditingDataToggle] = useState(false)

	const [tab, setTab] = useState('todo')

	const [testingToggle, setTestingToggle] = useState(false)

	const [searchToggle, setSearchToggle] = useState(false)

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

	const archiveTask = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks[indexOfTarget].marks.archived = true

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

	const restoreTask = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks[indexOfTarget].marks.deleted = false

		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		fetchLocalstorage()
	}

	const permanentDeleteTask = id => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === id)

		localStored.tasks.splice(indexOfTarget, 1)
		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		setTimeout(() => fetchLocalstorage(), 1000)
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

	const purge = () => {
		setOpenedDataId('')
		localStorage.setItem('p1project', JSON.stringify({columns: [], tasks: [] }))
		fetchLocalstorage()
	}

	const refill = () => {
		const data = '{"columns":["Monday","Vacation","Study","Game","Movie"],"tasks":[{"id":"7441287d-a44a-4fe0-8110-ae904247f21b","column":"Monday","title":"First","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ultrices dui sapien eget mi.","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682580826845},{"id":"cdec05a3-50d0-415b-9a8d-2c167874704d","column":"Monday","title":"Sleep","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat vestibulum lectus mauris ultrices eros in cursus.","dueDate":"2023-05-11T18:58","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682582334420},{"id":"aa76fdce-f6fd-40a3-a567-8411a05b6085","column":"Monday","title":"Eat","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat vestibulum lectus mauris ultrices eros in cursus.","dueDate":"2023-05-06T15:59","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682582355634},{"id":"a47784d3-bf46-45fa-bdb9-4791a57f9f9e","column":"Monday","title":"Fa","description":"No description","dueDate":"2023-05-06T15:00","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682582375813},{"id":"0f38dccc-2afb-41e9-9bb7-07377cafabdf","column":"Vacation","title":"Sleep","description":"No description","dueDate":"2023-05-23T16:00","status":"done","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682582439974},{"id":"79370308-3d91-4c5a-bb98-b56f9c0acd02","column":"Vacation","title":"Gala","description":"No description","dueDate":"2023-05-20T16:00","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682582452876},{"id":"086b7e60-b2cb-44fc-b84f-18a2aef95dc7","column":"Vacation","title":"Outing","description":"No description","dueDate":"2023-05-11T16:01","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682582473842},{"id":"6e2a13f9-5b9e-4867-9ad7-7c867937b0ee","column":"Monday","title":"Fire","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682582607736},{"id":"6295bd72-1a60-44ce-94e5-65c3dcb581b4","column":"Vacation","title":"Play","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682582617105},{"id":"80fba56a-dcbf-4b79-9044-f83e34914e60","column":"Study","title":"Science","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603093791},{"id":"039ad2a3-c09c-4371-b6d2-226d76bd2062","column":"Study","title":"Math","description":"No description","dueDate":"No due date","status":"done","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603099260},{"id":"8d4a1ca5-99a8-4d57-aff4-ea9454c988a9","column":"Study","title":"History","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682603105587},{"id":"176a0c27-20b2-4432-a4a4-8181603ffffa","column":"Monday","title":"Play","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603116998},{"id":"4b774538-28d3-4452-ab95-f943aec2d29d","column":"Game","title":"LoL","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":true,"archived":false,"deleted":false},"createdAt":1682603137523},{"id":"07b49179-83ae-4417-ae31-55882aa1ba76","column":"Game","title":"CSGO","description":"No description","dueDate":"No due date","status":"done","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603145625},{"id":"65c2ca0c-de0d-4023-8d52-9354f26d57e2","column":"Game","title":"Valorant","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603154186},{"id":"1d28f67a-1083-4ebd-8c35-d1c38fc3d068","column":"Movie","title":"S1","description":"No description","dueDate":"No due date","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603321944},{"id":"ffc8075e-3733-4c86-a199-297c1c6a9c6b","column":"Movie","title":"S2","description":"No description","dueDate":"2023-05-19T21:48","status":"todo","tags":[],"list":[],"marks":{"marked":false,"archived":false,"deleted":false},"createdAt":1682603334490}]}'
		localStorage.setItem('p1project', data)
		fetchLocalstorage()
	}

	const handleTabSwap = val => {
		setOpenedDataId('')
		setOpenedDataToggle(false)

		if (tab === val){
			setTab('todo')
			let close = setTimeout(() => {
				setMenu(false)
				return () => clearTimeout(close)
			}, 750)
		} else {
			setTab(val)
			if (val === 'todo'){
				let close = setTimeout(() => {
					setMenu(false)
					return () => clearTimeout(close)
				}, 750)
			}

		}


	}

	const handleSearchToggle = () => {
		setSearchToggle(!searchToggle)
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
			<div className={(light ? 'bg-theme-light ' : 'bg-theme-dark text-white') + ' duration-300 ease-in-out hidden md:flex'}>
				<div className=' w-[28%] max-w-[28%] min-w-[28%] h-screen p-5'>
					<div className={(light ? 'bg-[#f8f8f8]' : 'bg-theme-dark-back ') + ' flex flex-col gap-5 w-full h-full drop-shadow-lg rounded-lg py-5 px-5  overflow-hidden'}>

						<div className='h-[40px] flex items-center justify-between'>
							<h1 className='text-3xl font-bold'>TodoList</h1>
							<div className='flex items-center gap-3'>
								<button onClick={() => setAddColumnToggle(!addColumnToggle)} className='text-xl bg-[#393E46] hover:bg-[#4ECCA3] duration-300 ease-in text-white rounded-md h-[32px] aspect-square flex items-center justify-center'>{ addColumnToggle ? <RxCross2 /> : <GoPlus />}</button>
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
										<div key={idx} className={(light ? 'bg-theme-light' : 'bg-theme-dark-fore') + ' flex flex-col gap-2 rounded-sm shadow-sm py-3 px-3'}>
											<div className='flex items-center justify-between font-medium px-2 py-1'>
												<h3>{ task }</h3>
												<button onClick={() => setDestinationColumn(task)}><GoPlus /></button>
											</div>
											<div className='flex flex-col gap-2 overflow-y-auto'>
												{
													tasks.tasks && tasks.tasks.filter(todo => todo.column === task && todo.marks.deleted === false && todo.marks.archived !== true).length !== 0 
													? tasks.tasks.filter(todo => todo.column === task && todo.marks.deleted === false && todo.marks.archived !== true).map(item => (
														<div key={item?.id} onMouseLeave={() => setTooltip('')} className={(item?.status !== 'todo' ? 'opacity-40 line-through ' : '') + (light ? ' hover:bg-[#f8f8f8] ' : 'hover:bg-theme-dark-back ') + ' flex items-center gap-2 h-[28px] px-2  duration-300 rounded-sm relative task-item'}>
															<span>{ item?.status !== 'todo' ? <BsCheckLg /> : <BsBox />}</span>
															<p className={(tooltip === item?.id ? 'w-[54%]' : 'task-item-text w-[84%]') + ' truncate '}>{item?.title}</p>
															<div className='h-full hidden duration-200 items-center gap-1 absolute right-2 task-item-action	z-20'>
																{
																	tooltip === item?.id && (
																		<div className='flex items-center gap-1'>
																			<button onClick={() => deleteTask(item?.id)} className='w-[22px] hover:text-white hover:bg-[#393E46] aspect-square rounded-md grid place-items-center duration-200'><BsTrash3 /></button>
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
														<div className='flex items-center gap-2 h-[28px] px-2 hover:bg-[#f8f8f8] cursor-default duration-300 rounded-sm'>
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
										<p className='text-sm font-medium'>No column found.<br />Add one by clicking the + icon above</p>
									</div>
								)
							}
						</div>
					</div>
				</div>

				<div className={(menu ? 'w-[50%]' : 'w-[72%] pr-5') + ' duration-300 origin-left h-screen py-5 relative '}>
					<div className={(light ? 'bg-[#f8f8f8]' : 'bg-theme-dark-back') + ' h-[9vh] flex items-center justify-between  px-4 rounded-lg shadow-md z-40'}>
						<div className='flex items-center gap-3 font-mono'>
							<div className='flex flex-col items-center'>
								<div className='flex items-center gap-2'>
									<h1 className='text-3xl font-bold'>Calendar</h1>
									{
										tab !== 'todo' && <span className='text-sm font-bold bg-[#393E46] py-1 px-3 rounded-lg text-white'>
											{ tab !== 'todo' ? tab === 'done' ? 'Done' : tab === 'important' ? 'Important' : tab=== 'archive' ? 'Archive' : tab === 'bin' ? 'Bin' : 'Todo' : '' }
										</span>
									}
								</div>
								<p className='text-xl font-bold self-start'>{`${day} ${time}`}</p>
							</div>
							{/* <div>
								<div className='flex items-center gap-1'>
									<h1 className='text-5xl'>{ today.slice(8)}</h1>
									<div className='flex flex-col font-medium'>
										<p className='text-sm leading-5'>{ today.slice(0, 4)}</p>
										<p className='text-lg leading-5 font-bold'>{ months[+today.slice(5, 7) - 1]}</p>
									</div>
								</div>
							</div> */}
						</div>
						<div className='flex items-center'>
							<button onClick={() => handleSearchToggle()} className='w-[36px] aspect-square grid place-items-center text-xl rounded-full'><BsSearch /></button>
							<button onClick={() => setMenu(!menu)} className='w-[36px] aspect-square grid place-items-center text-2xl rounded-full'>
								<span className=''>{ menu ? <HiMenu /> : <HiMenuAlt3 /> }</span>
							</button>
						</div>
					</div>
					
					<div className='h-[91%] overflow-y-auto p-4 z-30'>
						<DisplayTask tasks={tasks} setOpenedDataId={setOpenedDataId} light={light} openedDataId={openedDataId} setOpenedDataToggle={setOpenedDataToggle} setEditingDataToggle={setEditingDataToggle} setEditDateToggle={setEditDateToggle} tab={tab}  />
					</div>

					{
						openedDataId !== '' && (
							<button onClick={() => setOpenedDataToggle(!openedDataToggle)} className={(light ? 'bg-[#f8f8f8]' : 'bg-theme-dark-fore') + ' absolute bottom-6 right-7 h-[38px] px-5 gap-2 text-lg rounded-lg drop-shadow-md flex items-center font-medium'}>
								<span className={(openedDataToggle ? 'rotate-180' : 'rotate-0') + ' duration-300'}><BsCaretUpFill /></span>
								<span>{openedDataToggle ? 'Close Task Details' : 'Open Task Details' }</span>
							</button>
						)
					}

					{
						openedDataToggle && (
							<OpenData 
								openedDataId={openedDataId} 
								deleteTask={deleteTask} 
								archiveTask={archiveTask} 
								setOpenedDataId={setOpenedDataId} 
								setOpenedDataToggle={setOpenedDataToggle} 
								fetchLocalstorage={fetchLocalstorage} 
								permanentDeleteTask={permanentDeleteTask} 
								restoreTask={restoreTask} 
								editingDataToggle={editingDataToggle} 
								setEditingDataToggle={setEditingDataToggle} 
								editingDataId={editingDataId} 
								setEditingDataId={setEditingDataId} 
								editDateToggle={editDateToggle} 
								setEditDateToggle={setEditDateToggle} 
								tab={tab}
								doneTask={doneTask}
								undoDoneTask={undoDoneTask}
								removeMark={removeMark}
								
							/>
						)
					}
					
				</div>
				
				{
					menu &&
					<div className='w-[22%] origin-right duration-1000 absolute right-0 h-full p-5'>
						<div className={(light ? 'bg-[#f8f8f8]' : 'bg-theme-dark-back') + ' flex flex-col gap-5 w-full h-full justify-between drop-shadow-lg rounded-lg py-5 px-5 overflow-hidden'}>
							<div>
								<div className='flex items-center justify-between'>
									<h1 className='text-3xl font-bold'>Menu</h1>
									
									
									{
										light ? <button onClick={() => setLight(false)} className='text-xl rounded-full p-2 grid place-items-center shadow bg-white'><BsSun /></button> : <button onClick={() => setLight(true)} className='text-xl rounded-full p-2 grid text-white bg-[#393E46] place-items-center shadow'><BsFillMoonStarsFill /></button>
									}
								</div>
								<div className='my-5 flex flex-col gap-2'>
									
									<button onClick={() => handleTabSwap('todo')} className={(tab === 'todo' ? 'bg-[#393E46] text-white border-transparent' : 'bg-white border-transparent hover:border-[#393E46]') + ' border-2 duration-300 flex flex-col items-center justify-center shadow rounded text-sm font-medium py-6'}>
										<span className='text-3xl font-bold'>{ tasks?.tasks?.length }</span>
										<span>Total Tasks</span>
									</button>
									<div className='grid grid-cols-3 gap-2'>
										<button onClick={() => handleTabSwap('standby')} className={(tab === 'standby' ? (light ? 'bg-[#393E46] text-white scale-105 border-transparent' : 'bg-white text-[#393E46] scale-105 border-transparent') : tab === 'todo' ? 'bg-[#393E46] text-white border-transparent hover:border-[#393e46] hover:bg-white hover:text-[#393e46]' : 'bg-white border-transparent hover:border-[#393E46]') + ' border-2 duration-300 flex flex-col items-center shadow rounded justify-center aspect-square text-sm font-medium'}>
											<span className='text-3xl font-bold'>{ tasks?.tasks?.filter(task => task.status === 'todo' && task.marks.deleted !== true).length }</span>
											<span>To do</span>
										</button>
										<button onClick={() => handleTabSwap('important')} className={(tab === 'important' ? (light ? 'bg-[#393E46] text-white scale-105 border-transparent' : 'bg-white text-[#393E46] scale-105 border-transparent') : tab === 'todo' ? 'bg-[#393E46] text-white border-transparent hover:border-[#393e46] hover:bg-white hover:text-[#393e46]' : 'bg-white border-transparent hover:border-[#393E46]') + ' border-2 duration-300 flex flex-col items-center shadow rounded justify-center aspect-square text-sm font-medium'}>
											<span className='text-2xl font-bold'>{ tasks?.tasks?.filter(task => task.marks.marked).length }</span>
											<span>Important</span>
										</button>
										<button onClick={() => handleTabSwap('done')} className={(tab === 'done' ? (light ? 'bg-[#393E46] text-white scale-105 border-transparent' : 'bg-white text-[#393E46] scale-105 border-transparent') : tab === 'todo' ? 'bg-[#393E46] text-white border-transparent hover:border-[#393e46] hover:bg-white hover:text-[#393e46]' : 'bg-white border-transparent hover:border-[#393E46]') + ' border-2 duration-300 flex flex-col items-center shadow rounded justify-center aspect-square text-sm font-medium'}>
											<span className='text-2xl font-bold'>{ tasks?.tasks?.filter(task => task.status !== 'todo' && task.marks.deleted !== true).length }</span>
											<span>Done</span>
										</button>
									</div>
									<div className='grid grid-cols-2 gap-2'>
										<button onClick={() => handleTabSwap('archive')} className={(tab === 'archive' ? (light ? 'bg-[#393E46] text-white scale-105 border-transparent' : 'bg-white text-[#393E46] scale-105 border-transparent') : tab === 'todo' ? 'bg-[#393E46] text-white border-transparent hover:border-[#393e46] hover:bg-white hover:text-[#393e46]' : 'bg-white border-transparent hover:border-[#393E46]') + ' border-2 duration-300 flex flex-col items-center shadow rounded justify-center text-sm font-medium py-4'}>
											<span className='text-2xl font-bold'>{ tasks?.tasks?.filter(task => task.marks.archived).length }</span>
											<span>Archived</span>
										</button>
										<button onClick={() => handleTabSwap('bin')} className={(tab === 'bin' ? (light ? 'bg-[#393E46] text-white scale-105 border-transparent' : 'bg-white text-[#393E46] scale-105 border-transparent') : tab === 'todo' ? 'bg-[#393E46] text-white border-transparent hover:border-[#393e46] hover:bg-white hover:text-[#393e46]' : 'bg-white border-transparent hover:border-[#393E46]') + ' border-2 duration-300 flex flex-col items-center shadow rounded justify-center text-sm font-medium py-4'}>
											<span className='text-2xl font-bold'>{ tasks?.tasks?.filter(task => task.marks.deleted).length }</span>
											<span>Bin</span>
										</button>
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-1'>
								<button onClick={() => setTestingToggle(true)} className='text-white w-full h-[32px] rounded-md font-medium bg-[#393E46] hover:opacity-90 duration-200'>Debug Options</button>
								<button onClick={() => navigate('/')} className='text-white w-full h-[32px] rounded-md font-medium bg-pink-theme hover:opacity-90 duration-200'>Return Home</button>
							</div>
						</div>
					</div>
				}
				
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
			{
				testingToggle && <TestingOptions purge={purge} refill={refill} openedDataToggle={openedDataToggle} setTestingToggle={setTestingToggle} />
			}
			{
				searchToggle && <Search setSearchToggle={setSearchToggle} setOpenedDataId={setOpenedDataId} setOpenedDataToggle={setOpenedDataToggle} />
			}
		</>
	)
}

export default LocalDashboard
