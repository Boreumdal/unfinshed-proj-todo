import React from 'react'

const TestingOptions = ({ purge, refill, openedDataToggle, setTestingToggle }) => {
	return (
		<div className='absolute inset-0 grid place-items-center bg-[#3d3d3d3a]'>
			<div className='w-[240px] px-7 bg-white rounded-md py-6'>
				<h1 className='text-xl font-medium pb-2 border-b mb-2'>Tester Options</h1>
				<div className='flex flex-col items-center gap-1 font-mono text-sm'>
					<button onClick={() => purge()} className='text-white w-full h-[32px] rounded font-medium bg-[#393E46]' disabled={openedDataToggle}>Clear All</button>
					<button onClick={() => refill()} className='text-white w-full h-[32px] rounded font-medium bg-[#393E46]'>Fill premade todos</button>
					<button onClick={() => setTestingToggle(false)} className='text-white w-full h-[32px] rounded font-medium bg-pink-theme mt-5'>Close</button>
				</div>
			</div>
		</div>
	)
}

export default TestingOptions