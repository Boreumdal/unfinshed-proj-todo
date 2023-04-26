import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import PulseLoader from 'react-spinners/PulseLoader'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';

const AddTaskModal = ({ destinationColumn, setDestinationColumn }) => {
    const taskDefault = {
        id: '',
        column: destinationColumn,
        title: '',
        description: '',
        dueDate: '',
        status: 'todo',
        tags: [],
        list: [],
        marks: {
            marked: false,
            archived: false,
            deleted: false
        },
        createdAt: 0
    }

    const [uiLoading, setUiLoading] = useState(false)
    const [hasDue, setHasDue] = useState(false)
    const [taskItem, setTaskItem] = useState(taskDefault)

    const handleHasDue = e => {
        setHasDue(e.target.checked)
        setTaskItem({ ...taskItem, dueDate: '' })
    }

    const handleMarked = e => {
        setTaskItem(prev => {
            return {
                ...prev,
                marks: {
                    ...prev.marks,
                    marked: e.target.checked
                }
            }
        })
    }

    const handleChanges = e => {
        setTaskItem(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setUiLoading(true)

        const task = {
            ...taskItem,
            id: uuidv4(),
            createdAt: Date.now(),
            description: taskItem.description ? taskItem.description : 'No description',
            dueDate: taskItem.dueDate ? taskItem.dueDate : 'No due date'
        }

        addTodoLocal(task)

        const back = setTimeout(() => {
            setTaskItem(taskDefault)
            setUiLoading(false)
            setDestinationColumn('')

            toast.success('Task added')

            return clearTimeout(back)
        }, 1200)

    }

    const addTodoLocal = task => {
        const prev = JSON.parse(localStorage.getItem('p1project'))
        prev.tasks.push(task)
        
        localStorage.setItem('p1project', JSON.stringify(prev))
    }

    return (
        <div className='absolute inset-0 grid place-items-center'>
            <div className='absolute w-[370px] z-20 bg-white shadow-md rounded-md'>
                <div className='py-4 mx-5 border-b'>
                    <h1 className='text-xl font-medium'>Add Task to <span className='font-mono font-bold text-[#4ECCA3]'>{ destinationColumn }</span></h1>
                </div>
                <form onSubmit={handleSubmit} className='px-7 py-4 flex flex-col gap-3'>
                    <div>
                        <label htmlFor="title" className='font-medium'>Title</label>
                        <input type="text" name='title' id='title' value={taskItem.title} onChange={handleChanges} className='px-3 border shadow-sm w-full block rounded h-[38px] bg-[#fafafa] mt-1' placeholder='Task title...' disabled={uiLoading} />
                    </div>
                    <div>
                        <label htmlFor="description" className='font-medium'>Description</label>
                        <textarea type="text" name='description' id='description' value={taskItem.description} onChange={handleChanges} className='px-3 border shadow-sm w-full block rounded py-2 bg-[#fafafa] mt-1' rows='4' placeholder='Task optional description...' disabled={uiLoading} />
                    </div>
                    <div className={(hasDue ? 'opacity-100' : 'opacity-50 cursor-not-allowed') + ' duration-200'}>
                        <label htmlFor="dueDate" className='font-medium pointer-events-none'>Due Date</label>
                        <input type="datetime-local" name='dueDate' id='dueDate' value={taskItem.dueDate} onChange={handleChanges} className='px-3 border shadow-sm w-full block rounded py-2 bg-[#fafafa] mt-1 disabled:cursor-not-allowed' disabled={!hasDue} />
                    </div>
                    <div className='flex flex-col gap-2 my-1'>
                        <div className='flex gap-2 font-medium'>
                            <input type="checkbox" name="due" id="due" checked={hasDue} onChange={handleHasDue} disabled={uiLoading} />
                            <label htmlFor="due">Has due date?</label>
                        </div>
                        <div className='flex gap-2 font-medium'>
                            <input type="checkbox" name="mark" id="mark" checked={taskItem.marks.marked} onChange={handleMarked} disabled={uiLoading} /> 
                            <label htmlFor="mark">Mark as important?</label>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-end mt-2'>
                        <button type='button' onClick={() => console.log(JSON.parse(localStorage.getItem('p1project')))} className='h-[32px] bg-transparent px-4 flex items-center gap-1 rounded hover:text-blue-theme duration-200'>Show</button>
                        <button type='button' onClick={() => setDestinationColumn('')} className='h-[32px] bg-transparent px-4 flex items-center gap-1 rounded hover:text-blue-theme duration-200'>Cancel</button>
                        <button type='submit' className='h-[32px] w-[72px] bg-[#4ECCA3] px-4 flex items-center justify-center gap-1 rounded text-white hover:brightness-95 duration-200 disabled:brightness-90 disabled:bg-[#383838] disabled:cursor-not-allowed font-medium' disabled={!taskItem.title || (hasDue && !taskItem.dueDate)}>
                            {
                                uiLoading ? <PulseLoader color="#ffffff" size={5} /> : <><GoPlus /><span>Add</span></>
                            }
                        </button>
                    </div>
                </form>
            </div>
            <div className='absolute w-screen h-screen bg-[#39393934] z-10'></div>
        </div>
    )
}
// 
export default AddTaskModal