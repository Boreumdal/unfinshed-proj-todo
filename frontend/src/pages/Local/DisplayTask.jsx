import React, { useState, useEffect } from 'react'
import { BsCalendar2, BsCalendar2Check, BsCalendar2Heart, BsCaretDownFill, BsCaretUpFill, BsFolder2Open, BsFolder2, BsSave2 , BsExclamationCircle, BsEmojiSmile, BsBox2, BsEnvelopePaper } from 'react-icons/bs'
import { useAnimate, motion, AnimatePresence } from "framer-motion"
import { useTodos } from '../../data/context/TodosContext'

const DisplayTask = ({tasks, setOpenedDataId, openedDataId, setOpenedDataToggle, setEditingDataToggle, setEditDateToggle, tab }) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const year = new Date().getFullYear()
	const [noDue, setNoDue] = useState([])
	const [dates, setDates] = useState([])

	const { light } = useTodos()


	const openTaskHandler = item => {
		setOpenedDataId(item)
		setEditingDataToggle(false)
		setEditDateToggle(false)
		setOpenedDataToggle(true)
	}

	useEffect(() => {

		let tempArr1 = []
		let tempArr2 = []
		if (tasks.tasks){
			tempArr1 = tasks.tasks.filter(task => task.dueDate === 'No due date').sort((a, b) => a.createAt - b.createdAt)

			tasks.tasks.map(task => {
				if (tempArr2.indexOf(task.dueDate.slice(0, 10)) === -1 && task.dueDate !== 'No due date'){
					tempArr2.push(task.dueDate.slice(0, 10))
				}
			})
		}
		setNoDue(tempArr1)
		setDates(tempArr2)
	}, [tasks])

	return (
		<div className='flex flex-col gap-5 h-full'>
			{
				tab === 'todo' && dates && dates.length > 0 && dates.sort((a, b) => Date.parse(a) - Date.parse(b))
					.map((date, idx) => tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.marks.archived !== true).length > 0 && (
						<div key={idx} className='mt-2'>
							<div className={(light ? 'text-theme-dark ' : 'text-theme-dark-text') + ' flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>{date.slice(8)}</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{date.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{months[+date.slice(5, 7) - 1]}</p>
								</div>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
								{
									tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.marks.archived !== true).map(item => (
										<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
											<div className='flex items-center gap-2'>
												{
													item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
												}
												<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
											</div>
											<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
										</div>
									))
								}
							</div>
						</div>
					)
				)
			}
			{
				tab === 'standby' && dates && dates.length > 0 && dates.sort((a, b) => Date.parse(a) - Date.parse(b))
					.map((date, idx) => tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.marks.archived !== true && task.status === 'todo').length > 0 && (
						<div key={idx} className='mt-2'>
							<div className='flex items-center font-medium gap-2 border-b pb-2'>
								<h1 className='text-5xl'>{date.slice(8)}</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{date.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{months[+date.slice(5, 7) - 1]}</p>
								</div>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
								{
									tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.marks.archived !== true && task.status === 'todo').map(item => (
										<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
											<div className='flex items-center gap-2'>
												{
													item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
												}
												<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
											</div>
											<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
										</div>
									))
								}
							</div>
						</div>
					)
				)
			}
			{
				tab === 'important' && dates && dates.length > 0 && dates.sort((a, b) => Date.parse(a) - Date.parse(b))
					.map((date, idx) => tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.marks.marked === true).length > 0 && (
						<div key={idx} className='mt-2'>
							<div className='flex items-center font-medium gap-2 border-b pb-2'>
								<h1 className='text-5xl'>{date.slice(8)}</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{date.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{months[+date.slice(5, 7) - 1]}</p>
								</div>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
								{
									tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.marks.marked === true).map(item => (
										<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
											<div className='flex items-center gap-2'>
												{
													item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
												}
												<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
											</div>
											<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
										</div>
									))
								}
							</div>
						</div>
					)
				)
			}
			{
				tab === 'done' && dates && dates.length > 0 && dates.sort((a, b) => Date.parse(a) - Date.parse(b))
					.map((date, idx) => tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.status !== 'todo').length > 0 && (
						<div key={idx} className='mt-2'>
							<div className='flex items-center font-medium gap-2 border-b pb-2'>
								<h1 className='text-5xl'>{date.slice(8)}</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{date.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{months[+date.slice(5, 7) - 1]}</p>
								</div>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
								{
									tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted !== true && task.dueDate.slice(0,10) === date && task.status !== 'todo').map(item => (
										<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
											<div className='flex items-center gap-2'>
												{
													item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
												}
												<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
											</div>
											<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
										</div>
									))
								}
							</div>
						</div>
					)
				)
			}
			{
				tab === 'archive' && dates && dates.length > 0 && dates.sort((a, b) => Date.parse(a) - Date.parse(b))
					.map((date, idx) => tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.archived === true && task.dueDate.slice(0,10) === date).length > 0 && (
						<div key={idx} className='mt-2'>
							<div className='flex items-center font-medium gap-2 border-b pb-2'>
								<h1 className='text-5xl'>{date.slice(8)}</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{date.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{months[+date.slice(5, 7) - 1]}</p>
								</div>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
								{
									tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.archived === true && task.dueDate.slice(0,10) === date).map(item => (
										<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
											<div className='flex items-center gap-2'>
												<span className='' title='Archived'><BsSave2 /></span>
												{
													item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
												}
												<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
											</div>
											<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
										</div>
									))
								}
							</div>
						</div>
					)
				)
			}
			{
				tab === 'bin' && dates && dates.length > 0 && dates.sort((a, b) => Date.parse(a) - Date.parse(b))
					.map((date, idx) => tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted === true && task.dueDate.slice(0,10) === date).length > 0 && (
						<div key={idx} className='mt-2'>
							<div className='flex items-center font-medium gap-2 border-b pb-2'>
								<h1 className='text-5xl'>{date.slice(8)}</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{date.slice(0, 4)}</p>
									<p className='text-lg leading-5'>{months[+date.slice(5, 7) - 1]}</p>
								</div>
							</div>

							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
								{
									tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.marks.deleted === true && task.dueDate.slice(0,10) === date).map(item => (
										<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
											<div className='flex items-center gap-2'>
												<span><BsExclamationCircle /></span>
												{
													item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
												}
												<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
											</div>
											<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
										</div>
									))
								}
							</div>
						</div>
					)
				)
			}
			{
				noDue && noDue.length > 0 && <>
					{
						tab === 'todo' && noDue && noDue.filter(item => item.marks.deleted !== true && item.marks.archived !== true).length !== 0 && (
							<div className={(light ? 'text-theme-light-text ' : 'text-theme-dark-text ') + 'flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>00</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{year}</p>
									<p className='text-lg leading-5'>No Due</p>
								</div>
							</div>
						)
					}
					{
						tab === 'standby' && noDue && noDue.filter(item => item.marks.deleted !== true && item.marks.archived !== true && item.status === 'todo').length !== 0 && (
							<div className={(light ? 'text-theme-light-text ' : 'text-theme-dark-text ') + 'flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>00</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{year}</p>
									<p className='text-lg leading-5'>No Due</p>
								</div>
							</div>
						)
					}
					{
						tab === 'important' && noDue && noDue.filter(item => item.marks.deleted !== true && item.marks.marked === true).length !== 0 && (
							<div className={(light ? 'text-theme-light-text ' : 'text-theme-dark-text ') + 'flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>00</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{year}</p>
									<p className='text-lg leading-5'>No Due</p>
								</div>
							</div>
						)
					}
					{
						tab === 'done' && noDue && noDue.filter(item => item.marks.deleted !== true && item.status !== 'todo').length !== 0 && (
							<div className={(light ? 'text-theme-light-text ' : 'text-theme-dark-text ') + 'flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>00</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{year}</p>
									<p className='text-lg leading-5'>No Due</p>
								</div>
							</div>
						)
					}
					{
						tab === 'archive' && noDue && noDue.filter(item => item.marks.archived === true).length !== 0 && (
							<div className={(light ? 'text-theme-light-text ' : 'text-theme-dark-text ') + 'flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>00</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{year}</p>
									<p className='text-lg leading-5'>No Due</p>
								</div>
							</div>
						)
					}
					{
						tab === 'bin' && noDue && noDue.filter(item => item.marks.deleted === true).length !== 0 && (
							<div className={(light ? 'text-theme-light-text ' : 'text-theme-dark-text ') + 'flex items-center font-medium gap-2 border-b pb-2'}>
								<h1 className='text-5xl'>00</h1>
								<div className='flex flex-col'>
									<p className='text-sm leading-5'>{year}</p>
									<p className='text-lg leading-5'>No Due</p>
								</div>
							</div>
						)
					}
					<div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
						{
							tab === 'todo' && noDue && noDue.filter(item => item.marks.deleted !== true && item.marks.archived !== true).map((item, idx) => (
								<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
									<div className='flex items-center gap-2'>
										{
											item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span>
										}
										<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
									</div>
									<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
								</div>
							))
						}
						{
							tab === 'standby' && noDue && noDue.filter(item => item.marks.deleted !== true && item.marks.archived !== true && item.status === 'todo').map((item, idx) => (
								<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
									<div className='flex items-center gap-2'>
										{
											item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span>
										}
										<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
									</div>
									<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
								</div>
							))
						}
						{
							tab === 'important' && noDue && noDue.filter(item => item.marks.deleted !== true && item.marks.marked === true).map((item, idx) => (
								<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
									<div className='flex items-center gap-2'>
										{
											item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span>
										}
										<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
									</div>
									<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
								</div>
							))
						}
						{
							tab === 'done' && noDue && noDue.filter(item => item.marks.deleted !== true && item.status !== 'todo').map((item, idx) => (
								<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
									<div className='flex items-center gap-2'>
										{
											item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span>
										}
										<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
									</div>
									<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
								</div>
							))
						}
						{
							tab === 'archive' && noDue && noDue.filter(item => item.marks.archived === true && item.marks.deleted === false).map((item, idx) => (
								<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
									<div className='flex items-center gap-2'>
										<span className='' title='Archived'><BsSave2 /></span>
										{
											item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span>
										}
										<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
									</div>
									<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
								</div>
							))
						}
						{
							tab === 'bin' && noDue && noDue.filter(item => item.marks.deleted === true).map((item, idx) => (
								<div key={item.id} onClick={() => openTaskHandler(item.id)} className={((item.status !== 'todo' ? 'opacity-50 text-gray-400' : '') + (openedDataId && openedDataId !== item.id ? (light ?' bg-[#EEEEEE] hover:brightness-105' : 'bg-theme-dark-back hover:brightness-125') : (light ? ' bg-[#f7f7f7]' : ' bg-theme-dark-fore'))) + ' cursor-pointer hover:shadow-none duration-200 w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
									<div className='flex items-center gap-2'>
										<span><BsExclamationCircle /></span>
										{
											item.status === 'todo' ? item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : item.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span>
										}
										<h1 className='font-medium truncate max-w-[140px]'>{item.title}</h1>
									</div>
									<span className='text-lg'>{ openedDataId === item.id ? <BsFolder2Open /> : <BsFolder2 /> }</span>
								</div>
							))
						}
					</div>
				</>
			}
			{
				tab === 'todo' && noDue && noDue?.length === 0 && tasks && tasks?.tasks?.length === 0 && (
					<div className='w-full h-full flex items-center justify-center gap-2'>
						<span className='text-2xl'><BsEnvelopePaper /></span>
						<p className=''>No task to do found</p>
					</div>
				)
			}
			{
				tab === 'standby' && noDue && noDue?.filter(task => task.marks.deleted !== true && task.marks.archived !== true && task.status === 'todo').length === 0 && tasks && tasks?.tasks?.filter(task => task.marks.deleted !== true && task.marks.archived !== true && task.status === 'todo').length === 0 && (
					<div className='w-full h-full flex items-center justify-center gap-2'>
						<span className='text-2xl'><BsBox2 /></span>
						<p className=''>You don't have task to do</p>
					</div>
				)
			}
			{
				tab === 'archive' && noDue && noDue?.filter(task => task.marks.archived === true && task.marks.deleted === false).length === 0 && tasks && tasks?.tasks?.filter(task => task.marks.archived === true && task.marks.deleted === false).length === 0 && (
					<div className='w-full h-full flex items-center justify-center gap-2'>
						<span className='text-2xl'><BsBox2 /></span>
						<p className=''>You don't have archived task</p>
					</div>
				)
			}
			{
				tab === 'important' && noDue && noDue?.filter(task => task.marks.deleted !== true && task.marks.marked === true).length === 0 && tasks && tasks?.tasks?.filter(task => task.marks.deleted !== true && task.marks.marked === true).length === 0 && (
					<div className='w-full h-full flex items-center justify-center gap-2'>
						<span className='text-2xl'><BsBox2 /></span>
						<p className=''>You don't have important task listed</p>
					</div>
				)
			}
			{
				tab === 'done' && noDue && noDue?.filter(task => task.marks.deleted !== true && task.status !== 'todo').length === 0 && tasks && tasks?.tasks?.filter(task => task.marks.deleted !== true && task.status !== 'todo').length === 0 && (
					<div className='w-full h-full flex items-center justify-center gap-2'>
						<span className='text-2xl'><BsBox2 /></span>
						<p className=''>You don't have important task listed</p>
					</div>
				)
			}
			{
				tab === 'bin' && noDue && noDue?.filter(task => task.marks.deleted === true).length === 0 && tasks && tasks?.tasks?.filter(task => task.marks.deleted === true).length === 0 && (
					<div className='w-full h-full flex items-center justify-center gap-2'>
						<span className='text-2xl'><BsEmojiSmile /></span>
						<p className=''>Nice! Your deleted task bin is empty</p>
					</div>
					
				)
			}
		</div>
	)
}

export default DisplayTask