import React, { useEffect, useState } from 'react'
import { BsSearch, BsFolder2, BsCalendar2Heart, BsCalendar2Check, BsCalendar2, BsFillQuestionDiamondFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { useTodos } from '../../data/context/TodosContext'

const Search = ({ setSearchToggle, setOpenedDataId, setOpenedDataToggle }) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	const { tasks, light } = useTodos()
	const [searchTitle, setSearchTitle] = useState('')
	const [result, setResult] = useState([])
	const [searchDates, setSearchDates] = useState([])
	const [resultColumn, setResultColumn] = useState([])

	const handleSearchClicked = id => {
		setOpenedDataId(id)
		setSearchToggle(false)
		setOpenedDataToggle(true)
	}

	useEffect(() => {
		if (searchTitle){
			let filtered = tasks.tasks.filter(task => task.title.toLowerCase().includes(searchTitle.toLowerCase()))

			setResult(filtered)

		}
	}, [searchTitle])

	useEffect(() => {
		if (result.length > 0){
			let temp1 = []
			let temp2 = []

			result.map(task => {
				if (!temp1.includes(task.dueDate.slice(0,10))){
					temp1.push(task.dueDate.slice(0,10))
				}
			})

			setResultColumn(temp1)
		}
	}, [result])
	
	return (
		<div className='absolute grid place-items-center inset-0 bg-[#3d3d3d2e]'>
			<div className={(light ? 'bg-white' : 'bg-theme-dark-fore text-white') + ' w-[448px] rounded-lg overflow-hidden'}>
				<div className='h-[44px] w-full flex items-center gap-1'>
					<span className='text-xl h-full aspect-square grid place-items-center'><BsSearch /></span>
					<input type="text" className='bg-transparent w-full h-full outline-none border-none font-medium' value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder='Search by title...' />
					<button onClick={() => setSearchToggle(false)} title='Close' className='hover:bg-theme-dark hover:text-theme-light duration-300 ease-in-out text-2xl h-full aspect-square grid place-items-center'><MdClose /></button>
				</div>
				<div className='flex flex-col'>
					<div className='py-3 px-4 flex items-center justify-between'>
						{
							searchTitle && <>
								<h1 className='text-lg font-medium'>Results</h1>
								<p className='text-xs'>{ result?.length > 0 && <span>Showing <span className='font-bold'>{result.length}</span> results</span> }</p>
							</>
						}

					</div>
					<div className='min-h-[220px] h-[270px] overflow-auto pb-2'>
						{
							searchTitle ? result?.map(task => task).length > 0 
								? (
									<div className='flex flex-col gap-4 px-4 pb-2'>
										{
											resultColumn?.sort((a, b) => Date.parse(a) - Date.parse(b)).map(date => (
												<div key={date} className=''>
													<h1 className='font-medium pb-1'>{date !== 'No due dat' ? `${months[+date.slice(5, 7) - 1]} ${date.slice(8)}, ${date.slice(0,4)}` : 'No due date'}</h1>
													<div className='flex flex-col gap-2'>
														{
															result?.filter(task => task.dueDate.slice(0, 10) === date).map(task => (
																<div key={task.id} onClick={() => handleSearchClicked(task.id)} className={(light ? 'bg-[#EEEEEE]' : 'bg-[#ffffff18]') + ' hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
																	<div className='flex items-center gap-2'>
																		{
																			task.status === 'todo' ? task.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2 /></span> : task.marks.marked ? <span><BsCalendar2Heart /></span> : <span><BsCalendar2Check /></span> 
																		}
																		<h1 className='font-medium truncate max-w-[140px]'>{task.title}</h1>
																	</div>
																	<span className='text-lg'><BsFolder2 /></span>
																</div>
															))
														}
													</div>

												</div>
											))
										}
										
									</div>
								)
								: (
									<div className='hover:brightness-105 text-center hover:shadow-none duration-200 w-full h-full flex justify-center items-center px-3'>
										<p className='text-center'>No result found for <span className='text-[#03C988] font-mono'>{ searchTitle }</span></p>
									</div>
								)
							: (
								<div className='text-center hover:shadow-none duration-200 w-full h-full flex justify-center items-center gap-2 px-3'>
									<span className=''><BsFillQuestionDiamondFill /></span>
									<p className='text-center'>Enter a title on the search input</p>
								</div>
							)
						}
					</div>

				</div>
			</div>
		</div>
	)
}

export default Search