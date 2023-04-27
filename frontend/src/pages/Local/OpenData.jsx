import React, { useState, useEffect } from 'react'

import { FaStickyNote, FaStar } from 'react-icons/fa'
import { useTodos } from '../../data/context/TodosContext'

const OpenData = ({ openedDataId }) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const {tasks, setTasks } = useTodos()
    const [openedData, setOpenedData] = useState({})

    useEffect(() => {
        if (tasks && openedDataId){
            setOpenedData(tasks.tasks.find(task => task.id === openedDataId))
        }
    }, [openedDataId, tasks])

    return <>
        {
            openedData.id && (
                <div className='absolute bottom-6 mb-[44px] right-7 w-[420px] bg-[#f8f8f8] p-6 rounded-lg drop-shadow-lg font-medium'>
                    <h1 className='font-bold text-3xl'>Task</h1>
                    <h1 className='font-bold py-2 border-b'><span className='font-medium text-gray-500'>From column </span>Title</h1>
                    
                    <div className='my-5 flex flex-col gap-3'>
                        <div className=''>
                            <h3 className='font-bold'>Title</h3>
                            <p className='text-gray-500'>{ openedData.title }</p>
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Description</h3>
                            <p className='text-gray-500'>{ openedData.description }</p>
                        </div>
                    </div>

                    <div className='mt-5 flex flex-col gap-3'>
                        <div className=''>
                            <h3 className='font-bold'>Due Date</h3>
                            {/* 24-11 ////// 12-23 */}
                            {
                                openedData.dueDate !== 'No due date' ? (
                                    <>
                                        <p className='text-gray-500'>{`${ months[openedData.dueDate.slice(5, 7) - 1] } ${ openedData.dueDate.slice(8, 10) }, ${ openedData.dueDate.slice(0, 4)}` }</p>
                                        <p className='text-gray-500'>{`${+openedData.dueDate.slice(11, 13) > 11 && +openedData.dueDate.slice(11, 13) < 24 ? (+openedData.dueDate.slice(11, 13) - 12 < 10 ? '0' + (+openedData.dueDate.slice(11, 13) - 12) : +openedData.dueDate.slice(11, 13) - 12) + ':' + openedData.dueDate.slice(14) + ' PM' : +openedData.dueDate.slice(11, 13) + ':' + openedData.dueDate.slice(14) + ' AM'}`}</p>
                                    </>
                                ) : <p className='text-gray-500'>N/A No due date</p>
                            }
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Marks</h3>
                            <div className='flex items-center gap-2'>
                                <div className='text-sm py-1 px-3 bg-gray-600 w-fit text-white font-medium rounded-md flex items-center gap-1'>
                                    <span><FaStickyNote /></span>
                                    <span>Todo</span>
                                </div>
                                {
                                    openedData.marks.marked && (
                                        <div className='text-sm py-1 px-3 bg-gray-600 w-fit text-white font-medium rounded-md flex items-center gap-1'>
                                            <span><FaStar /></span>
                                            <span>Important</span>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                    <div className='mt-10 grid grid-cols-3 gap-2'>
                        <button className='hover:bg-[#FF6D60] bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Edit</button>
                        <button className='hover:bg-emerald-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Archive</button>
                        <button className='hover:bg-pink-theme bg-gray-600 duration-200 ease-in-out h-[38px] rounded-md w-full font-medium text-white shadow'>Delete</button>
                    </div>
                </div>
            )

        }
    </>
}

export default OpenData