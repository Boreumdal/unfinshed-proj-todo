import React, { useState, useEffect } from 'react'
import { BsFillGearFill, BsBox, BsBoxSeam, BsTrash3, BsStarFill, BsStar, BsThreeDots, BsCheckLg, BsArrowCounterclockwise, BsFillPersonFill, BsCaretUpFill, BsFillMoonStarsFill, BsSun } from 'react-icons/bs'
import { FaStickyNote, FaStar } from 'react-icons/fa'
import { useTodos } from '../../data/context/TodosContext'
import { toast } from 'react-toastify'

import { useAnimate, motion, AnimatePresence } from "framer-motion"
const OpenData = ({ doneTask, undoDoneTask, removeMark, openedDataId, deleteTask, archiveTask, setOpenedDataToggle, setOpenedDataId, fetchLocalstorage, editingDataToggle, setEditingDataToggle, editingDataId, setEditingDataId, editDateToggle, setEditDateToggle, tab, restoreTask, permanentDeleteTask }) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const {tasks, setTasks, light } = useTodos()

    const [openedData, setOpenedData] = useState({})
	const [editingData, setEditingData] = useState({})

    useEffect(() => {
        if (tasks && openedDataId){
            setOpenedData(tasks.tasks.find(task => task.id === openedDataId))
        }
        if (tasks && editingDataId){
            setEditingData(tasks.tasks.find(task => task.id === editingDataId))
        }
    }, [openedDataId, editingDataId, tasks])

    const handleEditOnchange = e => {
        setEditingData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleDelete = (id, title) => {
        deleteTask(id)
        setOpenedDataToggle(false)
        setOpenedDataId('')

        toast.error(title)
    }

    const handleEdit = (id, data) => {
        setEditingDataToggle(true)
        setEditingDataId(id)
        setEditingData(data)
        if (data.dueDate !== 'No due date'){
            setEditDateToggle(true)
        }
    }

    const handleEditHasDue = e => {
        
        setEditDateToggle(e.target.checked)

        if (editingData.dueDate !== 'No due date'){
            setEditingData(prev => {
                return {
                    ...prev,
                    dueDate: 'No due date' 
                }
            })
        } else {
            setEditingData(prev => {
                return {
                    ...prev,
                    dueDate: ''
                }
            })
        }
    }

    const handleCancel = () => {
        setEditingDataToggle(false)
    }

    const handleArchive = (id, title) => {
        archiveTask(id)
        setOpenedDataToggle(false)
        setOpenedDataId('')

        toast.success(title)
    }

    const handleRestore = (id, title) => {
        restoreTask(id)
        setOpenedDataToggle(false)
        setOpenedDataId('')

        toast.success(title)
    }
    const handlePermanentDelete = (id, title) => {
        permanentDeleteTask(id)
        setOpenedDataToggle(false)
        setOpenedDataId('')

        toast.success(title)
    }

    const handleSaveEdit = data => {
        const localStored = JSON.parse(localStorage.getItem('p1project'))
		const indexOfTarget = localStored.tasks.findIndex(item => item.id === data.id)

		localStored.tasks[indexOfTarget].title = data.title
        localStored.tasks[indexOfTarget].description = data.description ? data.description : 'No description'
        localStored.tasks[indexOfTarget].dueDate = data.dueDate

		localStorage.setItem('p1project', JSON.stringify(localStored))
		
		fetchLocalstorage()
        setEditingDataToggle(false)
    }

    return <>
        {
            openedData.id && (
                <motion.div initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} exit={{ y: 400, opacity: 0 }} className={(light ? 'bg-[#f8f8f8]' : 'bg-theme-dark-fore') + ' absolute bottom-6 mb-[44px] right-7 w-[342px] sm:w-[420px] py-6 px-5 rounded-lg drop-shadow-lg font-medium'}>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold text-3xl max-w-[140px] truncate'>{ openedData.title }</h1>
                        <div className='flex text-xl items-center gap-1'>
                            {
                                openedData.status === 'todo'
                                ? <button onClick={() => doneTask(openedData.id)} className='w-[25px] hover:text-white hover:bg-theme-dark-back aspect-square rounded-md grid place-items-center duration-200'><BsCheckLg /></button>
                                : <button onClick={() => undoDoneTask(openedData.id)} className='w-[25px] hover:text-white hover:bg-theme-dark-back aspect-square rounded-md grid place-items-center duration-200'><BsArrowCounterclockwise /></button>
                            }
                            <button onClick={() => removeMark(openedData.id)}  className='w-[25px] hover:text-white hover:bg-theme-dark-back aspect-square rounded-md grid place-items-center duration-200'>{ openedData?.marks?.marked ? <span className='text-sunglow'><BsStarFill /></span> : <span><BsStar /></span> }</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                    <h1 className='font-bold py-2 border-b'><span className={(light ? 'text-gray-500' : 'text-gray-300') + ' font-medium'}>From column </span>{ openedData.column}</h1>
                        <div>

                        </div>
                        {
                            openedData.status !== 'todo' && <div className='bg-green-600 text-sm text-white h-[25px] flex gap-1 items-center px-3 rounded-md shadow'>
                                    <span><BsCheckLg /></span>
                                    <span>Done</span>
                                </div>
                        }
                    </div>
                    
                    <div className='my-5 flex flex-col gap-3'>
                        <div className=''>
                            <h3 className='font-bold px-1'>Title</h3>
                            {
                                editingDataToggle
                                ? <input className='text-gray-500 w-full px-1' name='title' value={editingData.title} onChange={handleEditOnchange} />
                                : <p className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'}>{ openedData.title }</p>
                            }
                        </div>
                        <div className=''>
                            <h3 className='font-bold px-1'>Description</h3>
                            {
                                editingDataToggle
                                ? <textarea className='text-gray-500 w-full px-1 bg-white drop-shadow-sm' name='description' rows='4' value={editingData.description} onChange={handleEditOnchange}></textarea>
                                : <p className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'}>{ openedData.description }</p>
                            }
                        </div>
                    </div>

                    <div className='mt-5 flex flex-col gap-3'>
                        <div className=''>
                            <h3 className='font-bold px-1'>Due Date</h3>
                            {
                                openedData.dueDate !== 'No due date' ? (
                                    editingDataToggle ? <>
                                        <input type='datetime-local' className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'} name='dueDate' disabled={!editDateToggle} value={editingData.dueDate === 'No due date' ? '' : editingData.dueDate} onChange={handleEditOnchange} />
                                        <div className='text-gray-500 px-1 flex items-center gap-2 pt-1'>
                                            <input type="checkbox" name="due" id="due" checked={editingData.dueDate !== 'No due date'} onChange={handleEditHasDue} />
                                            <label htmlFor="due" className={(light ? 'text-gray-500' : 'text-gray-300')}>Has due date?</label>
                                        </div>
                                    </> : <>
                                        <p className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'}>{`${ months[openedData.dueDate.slice(5, 7) - 1] } ${ openedData.dueDate.slice(8, 10) }, ${ openedData.dueDate.slice(0, 4)}` }</p>
                                        <p className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'}>{`${+openedData.dueDate.slice(11, 13) > 11 && +openedData.dueDate.slice(11, 13) < 24 ? (+openedData.dueDate.slice(11, 13) - 12 < 10 ? '0' + (+openedData.dueDate.slice(11, 13) - 12) : +openedData.dueDate.slice(11, 13) - 12) + ':' + openedData.dueDate.slice(14) + ' PM' : +openedData.dueDate.slice(11, 13) + ':' + openedData.dueDate.slice(14) + ' AM'}`}</p>
                                    </>
                                ) : editingDataToggle
                                ? <>
                                    <input type='datetime-local' className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'} name='dueDate' disabled={!editDateToggle} value={editingData.dueDate === 'No due date' ? '' : editingData.dueDate} onChange={handleEditOnchange} />
                                    <div className='text-gray-500 px-1 flex items-center gap-2 pt-1'>
                                        <input type="checkbox" name="due" id="due" checked={editingData.dueDate !== 'No due date'} onChange={handleEditHasDue} />
                                        <label htmlFor="due" className={(light ? 'text-gray-500' : 'text-gray-300')}>Has due date?</label>
                                    </div>
                                </>
                                : <p className={(light ? 'text-gray-500' : 'text-gray-300') + ' px-1'}>N/A No due date</p>
                            }
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Marks</h3>
                            <div className='flex items-center gap-2'>
                                <div className='text-sm py-1 px-3 pointer-events-none bg-gray-600 w-fit text-white font-medium rounded-md flex items-center gap-1'>
                                    <span><FaStickyNote /></span>
                                    <span>Todo</span>
                                </div>
                                {
                                    openedData.marks.marked && (
                                        <div className='text-sm py-1 px-3 pointer-events-none bg-gray-600 w-fit text-white font-medium rounded-md flex items-center gap-1'>
                                            <span><FaStar /></span>
                                            <span>Important</span>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className={(editingDataToggle ? 'grid-cols-2' : tab === 'todo' ? 'grid-cols-3' : 'grid-cols-2')+ ' mt-10 grid gap-2'}>
                        {
                            editingDataToggle ? (
                                <>
                                    <button onClick={() => handleCancel()} className={(light ? 'text-gray-600' : 'text-gray-300') + ' hover:text-pink-theme duration-200 ease-in-out h-[38px] rounded-md w-full font-medium'}>Cancel</button>
                                    <button onClick={() => handleSaveEdit(editingData)} className='hover:bg-emerald-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow' disabled={editDateToggle === true && editingData.dueDate === ''}>Save</button>
                                </>
                            ) : (
                                <>
                                    { tab !== 'bin' && <button onClick={() => handleEdit(openedDataId, openedData)} className='hover:bg-[#FF6D60] bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Edit</button> }
                                    { tab === 'todo' && <button onClick={() => handleArchive(openedDataId, openedData.title)} className='hover:bg-emerald-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Archive</button> }
                                    { tab === 'bin' && <button onClick={() => handleRestore(openedDataId, openedData.title)} className='hover:bg-steelblue-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Restore</button> }
                                    { 
                                        tab !== 'bin' 
                                        ? <button onClick={() => handleDelete(openedDataId, openedData.title)} className='hover:bg-pink-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Delete</button>
                                        : <button onClick={() => handlePermanentDelete(openedDataId, openedData.title)} className='hover:bg-pink-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Perma Delete</button>
                                    }
                                </>
                            )
                        }
                        
                        
                    </div>
                </motion.div>
            )

        }
    </>
}

export default OpenData