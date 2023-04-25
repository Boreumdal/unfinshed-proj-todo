import React from 'react'
import { GoPlus } from 'react-icons/go'

const AddTaskModal = ({ destinationColumn, setDestinationColumn }) => {
  return (
    <div className='absolute inset-0 grid place-items-center'>
        <div className='absolute w-[370px] z-20 bg-white shadow-md rounded-md'>
            <div className='py-4 mx-5 border-b'>
                <h1 className='text-xl font-medium'>Add Task to <span className='font-mono font-bold text-[#4ECCA3]'>{ destinationColumn }</span></h1>
            </div>
            <form className='px-7 py-4 flex flex-col gap-3'>
                <div>
                    <label htmlFor="task" className='font-medium'>Title</label>
                    <input type="text" name='task' id='task' className='px-3 border shadow-sm w-full block rounded h-[38px] bg-[#fafafa] mt-1' placeholder='Task title...' />
                </div>
                <div>
                    <label htmlFor="description" className='font-medium'>Description</label>
                    <textarea type="text" name='description' id='description' className='px-3 border shadow-sm w-full block rounded py-2 bg-[#fafafa] mt-1' placeholder='Task optional description...' rows='4' />
                </div>
                <div>
                    <label htmlFor="duedate" className='font-medium'>Due Date</label>
                    <input type="datetime-local" name='duedate' id='duedate' className='px-3 border shadow-sm w-full block rounded py-2 bg-[#fafafa] mt-1' placeholder='Task optional description...' />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 font-medium'>
                        <input type="checkbox" name="due" id="due" />
                        <label htmlFor="due">Has due date?</label>
                    </div>
                    <div className='flex gap-2 font-medium'>
                        <input type="checkbox" name="due" id="due" />
                        <label htmlFor="due">Mark as important?</label>
                    </div>
                </div>
                <div className='flex gap-2 justify-end mt-2'>
                    <button onClick={() => setDestinationColumn('')} className='h-[32px] bg-transparent px-4 flex items-center gap-1 rounded hover:text-blue-theme duration-200'>Cancel</button>
                    <button className='h-[32px] bg-[#4ECCA3] px-4 flex items-center gap-1 rounded text-white hover:brightness-95 duration-200 disabled:brightness-90'>
                        <GoPlus />
						<span>Add</span>
                    </button>
                </div>
            </form>
        </div>
        <div className='absolute w-screen h-screen bg-[#39393934] z-10'></div>
    </div>
  )
}

export default AddTaskModal