import React, { useState, useEffect } from 'react'

const DisplayTask = ({tasks}) => {
	const [noDue, setNoDue] = useState([])
	const [dates, setDates] = useState([])

	useEffect(() => {
		setDates([])
		setNoDue([])

		let tempArr1 = []
		let tempArr2 = []
		if (tasks.tasks){
			tempArr1 = tasks.tasks.filter(task => task.dueDate === 'No due date').sort((a, b) => a.createAt - b.createdAt)

			tasks.tasks.map(task => {
				if (tempArr2.indexOf(task.dueDate.slice(0, 10)) === -1 && task.dueDate !== 'No due date'){
					tempArr2.push(task.dueDate.slice(0, 10))
				}
			})
		}
		setNoDue(tempArr1)
		setDates(tempArr2)
	}, [tasks])

	return (
		<div>
			<button onClick={() => console.log(dates)}>test</button>
			{
				dates && dates.length > 0 ? dates.map((date, idx) => (
					<div key={idx}>
						<h1 className='text-lg font-medium'>{date}</h1>
						{
							tasks && tasks.tasks.length > 0 && tasks.tasks.filter(task => task.dueDate.slice(0,10) === date).map(item => (
								<div key={item.id}>{item.dueDate}</div>
							))
						}
					</div>
				)) : <div>No dates found</div>
			}
		
			<div>
				<h1>No due</h1>
				{
					noDue && noDue.map((item, idx) => (
						<div key={idx}>
							{item.title}
						</div>
					))
				}

			</div>
		</div>
	)
}

export default DisplayTask