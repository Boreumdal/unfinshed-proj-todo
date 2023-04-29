import { createContext, useContext, useState } from "react";

const TodosContext = createContext({})

export const TodosTask = ({ children}) => {
    const [tasks, setTasks] = useState({})
    const [colums, setColumns] = useState([])
    const [light, setLight] = useState(true)

    return (
        <TodosContext.Provider value={{tasks, setTasks, colums, setColumns, light, setLight}}>
            { children }
        </TodosContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(TodosContext)
}