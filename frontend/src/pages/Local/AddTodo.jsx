import React, { useState } from 'react'
import { BsExclamationCircleFill } from 'react-icons/bs'

const AddTodo = ({ setAddTodoToggle }) => {
    const [hasDue, setHasDue] = useState(false)
	const [task, setTask] = useState({
		task: '',
		dueDate: '',
        status: 'todo',
        tag: {
            marked: false,
            archived: false,
            deleted: false
        },
        createdAt: Date.now()
	})

    const handleNoDue = e => {
        setHasDue(e.target.checked)
        setTask({...task, dueDate: ''})
    }

    const handleChange = e => {
        if (e.target.name !== 'marked'){
            setTask(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        } else {
            setTask(prev => {
                return {
                    ...prev,
                    tag: {...prev.tag, marked: e.target.checked }
                }
            })
        }
    }

    const handleAddTodo = e => {
        e.preventDefault()

        const localData = JSON.parse(localStorage.getItem('p1project'))

        const newTask = {
            ...task,
            dueDate: task.dueDate ? task.dueDate : 'No Due Date'
        }

        localStorage.setItem('p1project', JSON.stringify([...localData, newTask]))
        setTask({
            task: '',
            dueDate: '',
            status: 'todo',
            tag: {
                marked: false,
                archived: false,
                deleted: false
            },
            createdAt: Date.now()
        })
    }

    return (
        <div className='absolute flex items-center justify-center inset-0'>
            <div className='absolute bg-white z-20 w-[370px] shadow-md rounded'>
                <div className='flex items-center justify-between mx-5 pb-3 pt-5 border-b'>
                    <h1 onClick={() => console.log(JSON.parse(localStorage.getItem('p1project')))} className='text-2xl font-medium'>Add Todo</h1>
                    <span className='text-xl text-blue-theme'><BsExclamationCircleFill /></span>
                </div>
                <form onSubmit={handleAddTodo} className='px-7 flex flex-col gap-3 py-5'>
                    <div>
                        <label htmlFor="task" className='font-medium pointer-events-none block'>Task</label>
                        <textarea type="text" name="task" id="task" value={task.task} onChange={handleChange} className='py-2 px-3 text-sm shadow bg-gray-50 border w-full block rounded mt-1' rows='4' />
                    </div>
                    <div className={hasDue ? '' : 'opacity-60 cursor-not-allowed'}>
                        <label htmlFor="dueDate" className='font-medium pointer-events-none block'>Due date</label>
                        <input type="datetime-local" name="dueDate" id="dueDate" value={task.dueDate} onChange={handleChange} className='py-2 px-3 text-sm shadow bg-gray-50 border w-full block rounded mt-1 cursor-pointer disabled:cursor-not-allowed' disabled={!hasDue} />
                    </div>

                    <div className='flex flex-col gap-2 mt-2'>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" name="due" id="due" onChange={handleNoDue} />
                            <label htmlFor="due" className='font-medium text-sm'>Has due date?</label>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" name="marked" id="marked" value={task.important} onChange={handleChange} />
                            <label htmlFor="marked" className='font-medium text-sm'>Mark as important?</label>
                        </div>
                    </div>

                    <div className='flex items-center justify-end mt-3'>
                        <button type='button' onClick={() => setAddTodoToggle(false)} className='border-2 border-transparent hover:text-blue-theme font-medium px-5 text-center py-2 text-sm rounded duration-200'>Cancel</button>
                        <button type='submit' className='border-2 border-transparent hover:brightness-95 bg-blue-theme font-medium px-3 text-center text-white py-2 text-sm rounded duration-200 disabled:bg-gray-500 disabled:brightness-90' disabled={!task.task || hasDue && !task.dueDate}>Add Task</button>
                    </div>
                </form>
            </div>
            <div onDoubleClick={() => setAddTodoToggle(false)} className='absolute bg-[#2626266c] w-full h-full z-10'></div>
        </div>
    )
}

export default AddTodo