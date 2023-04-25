import React from 'react'
import { BsFillGearFill, BsPlusLg } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'

const LocalDashboard = () => {
	return (
		<div className='w-screen h-screen'>
			<div className='w-[30%] bg-accent-1 h-screen p-4 text-white'>
				<div className='flex items-center justify-between'>
					<h1 className='font-bold text-3xl text-white'>TodoList</h1>
					<div className='flex gap-3'>
						<button className='bg-[#ffffff2d] hover:bg-[#ffffff4a] duration-200 text-white text-xl p-2 rounded-md'><GoPlus /></button>
						<button className='bg-[#ffffff2d] hover:bg-[#ffffff4a] duration-200 text-white text-xl p-2 rounded-md'><BsFillGearFill /></button>
					</div>
				</div>
				<div>
					<div className='flex items-center'>
						<h1 className='w-1/3 font-medium pb-1'>To be done</h1>
						<div className='w-2/3 h-[2px] bg-white'></div>
					</div>
					<div className='flex flex-col gap-1'>
						<div className='grid grid-cols-[65%_auto] items-start bg-[#ffffff2d] py-2 px-3 gap-1'>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur a autem odio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, error fuga doloribus repudiandae odit veritatis ipsam in necessitatibus.</p>
							<div className='text-right'>
								<p>November 29, 2023</p>
								<p>5:12 PM</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>

			</div>
		</div>
	)
}

export default LocalDashboard