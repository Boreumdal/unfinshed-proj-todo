import React from 'react'
import { BsSearch, BsFolder2, BsCalendar2Heart } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

const Search = ({ setSearchToggle }) => {
	return (
		<div className='absolute grid place-items-center inset-0 bg-[#3d3d3d2e]'>
			<div className='w-[548px] bg-white rounded-lg overflow-hidden'>
				<div className='h-[44px] w-full flex items-center border gap-1'>
					<span className='text-xl h-full aspect-square grid place-items-center'><BsSearch /></span>
					<input type="text" className='bg-transparent w-full h-full outline-none border-none font-medium' placeholder='Search by title...' />
					<span className='text-2xl h-full aspect-square grid place-items-center'><MdClose /></span>
				</div>
				<div className='flex flex-col'>
					<div className='py-3 px-4'>
						<h1 className='text-lg font-medium'>Results</h1>
					</div>
					<div className='grid grid-cols-2 gap-1 px-2 pb-2'>
						<div className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
							<div className='flex items-center gap-2'>
								{
									<span><BsCalendar2Heart /></span>
								}
								<h1 className='font-medium truncate max-w-[140px]'>Lorem ipsum dolor sit amet.</h1>
							</div>
							<span className='text-lg'><BsFolder2 /></span>
						</div>
						<div className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
							<div className='flex items-center gap-2'>
								{
									<span><BsCalendar2Heart /></span>
								}
								<h1 className='font-medium truncate max-w-[140px]'>Lorem ipsum dolor sit amet.</h1>
							</div>
							<span className='text-lg'><BsFolder2 /></span>
						</div>
						<div className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
							<div className='flex items-center gap-2'>
								{
									<span><BsCalendar2Heart /></span>
								}
								<h1 className='font-medium truncate max-w-[140px]'>Lorem ipsum dolor sit amet.</h1>
							</div>
							<span className='text-lg'><BsFolder2 /></span>
						</div>
						<div className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
							<div className='flex items-center gap-2'>
								{
									<span><BsCalendar2Heart /></span>
								}
								<h1 className='font-medium truncate max-w-[140px]'>Lorem ipsum dolor sit amet.</h1>
							</div>
							<span className='text-lg'><BsFolder2 /></span>
						</div>
						<div className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
							<div className='flex items-center gap-2'>
								{
									<span><BsCalendar2Heart /></span>
								}
								<h1 className='font-medium truncate max-w-[140px]'>Lorem ipsum dolor sit amet.</h1>
							</div>
							<span className='text-lg'><BsFolder2 /></span>
						</div>
						<div className={' bg-[#EEEEEE] hover:brightness-105 cursor-pointer hover:shadow-none duration-200 font-medium w-full h-[35px] flex items-center justify-between px-3 rounded shadow-sm'}>
							<div className='flex items-center gap-2'>
								{
									<span><BsCalendar2Heart /></span>
								}
								<h1 className='font-medium truncate max-w-[140px]'>Lorem ipsum dolor sit amet.</h1>
							</div>
							<span className='text-lg'><BsFolder2 /></span>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Search