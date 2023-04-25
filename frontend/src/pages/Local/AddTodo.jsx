import React from 'react'

const AddTodo = () => {
  return (
    <div className='absolute flex items-center justify-center inset-0'>
        <div className='absolute bg-white z-20 w-[370px] h-[460px]'>
            <div>
                <h1>Add Todo</h1>
                <button>x</button>
            </div>
            <form>
                <div>
                    <label htmlFor="task">Task</label>
                    <input type="text" name="task" id="task" />
                </div>
            </form>
        </div>
        <div className='absolute bg-[#2626266c] w-full h-full z-10'></div>
    </div>
  )
}

export default AddTodo