import React, { useEffect, useState } from 'react'
import { BsSearch, BsFolder2, BsCalendar2Heart, BsCalendar2Check, BsCalendar2 } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { useTodos } from '../../data/context/TodosContext'

const Search = ({ setSearchToggle }) => {
	const { tasks } = useTodos()
	const [searchTitle, setSearchTitle] = useState('')
	const [result, setResult] = useState([])
	const [searchDates, setSearchDates] = useState([])

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

			for (let a = 0; a < result.length; a++){
				
			}
		}
	}, [result])
	
	return (
		<div className='absolute grid place-items-center inset-0 bg-[#3d3d3d2e]'>
			<div className='w-[548px] bg-white rounded-lg overflow-hidden'>
				<div className='h-[44px] w-full flex items-center border gap-1'>
					<span className='text-xl h-full aspect-square grid place-items-center'><BsSearch /></span>
					<input type="text" className='bg-transparent w-full h-full outline-none border-none font-medium' value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder='Search by title...' />
					<span className='text-2xl h-full aspect-square grid place-items-center'><MdClose /></span>
				</div>
				<div className='flex flex-col'>
					<div className='py-3 px-4 flex items-center justify-between'>
						<h1 className='text-lg font-medium'>Results</h1>
						<p>{ result?.length > 0 && result.length}</p>
					</div>
					<div className='min-h-[270px] h-[270px]'>
						{
							searchTitle ? result?.map(task => task).length > 0 
								? (
									<div className='grid grid-cols-2 gap-1 px-2 pb-2'>
										{
											result?.map(task => (
												<div key={task.id} className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
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
								)
								: (
									<div className={'hover:brightness-105 text-center hover:shadow-none duration-200 w-full h-full flex justify-center items-center px-3'}>
										<p className='text-center'>No result found for <span className='text-green-400'>{ searchTitle }</span></p>
									</div>
								)
							: (
								<div className={'text-center hover:shadow-none duration-200 w-full h-full flex justify-center items-center px-3'}>
									<p className='text-center'>Enter a title on the search input to begin</p>
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