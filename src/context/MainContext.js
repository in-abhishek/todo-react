import { createContext, useState } from "react";
import axios from "axios";
const TodoaContext = createContext();
export const TodosProvider = ({ children }) => {
    // manage todos
    const [todos, setTodos] = useState([]);

    const getAllTodos = async () => {
        const res = await axios.get('http://localhost:8000/todos');
        setTodos(res);
    }
    return (
        <TodoaContext.Provider value={{ todos, setTodos, getAllTodos }}>
            {children}
        </TodoaContext.Provider>
    )
}
export default TodoaContext;