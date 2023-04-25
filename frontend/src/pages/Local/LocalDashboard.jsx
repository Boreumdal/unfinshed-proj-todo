import React, { useState, useEffect } from 'react'
import { BsFillGearFill, BsPlusLg } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import AddTodo from './AddTodo'
import { useTodos } from '../../data/context/TodosContext'

const LocalDashboard = () => {
	const {tasks, setTasks} = useTodos()
	const [addTodoToggle, setAddTodoToggle] = useState(false)

	useEffect(() => {
		const localStored = JSON.parse(localStorage.getItem('p1project'))

		if (localStored){
			setTasks(localStored)
		} else {
			localStorage.setItem('p1project', '[]')
		}
	}, [])

	return (
		<>
			
		</>
	)
}

export default LocalDashboard