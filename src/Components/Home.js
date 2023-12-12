import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import TodoaContext from '../context/MainContext'
import axios from 'axios';

import { Link } from 'react-router-dom';
const Home = () => {
    const { todos, setTodos, getAllTodos } = useContext(TodoaContext);
    const data = todos.data;
    console.log("todos", data);
    const [input, setInput] = useState({
        name: "",
    });
    useEffect(() => {
        getAllTodos();
    }, []);
    const handleAdd = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/todos', input);
        getAllTodos();
        setInput({ name: "" });
    }

    // delete todk
    const handleDelte = async (deleteitems) => {
        await axios.delete(`http://localhost:8000/todos/${deleteitems}`);
        // console.log("todos",todos);
        const remainingItems = data.filter((items) => {
            return items.id !== deleteitems;
        });
        setTodos(remainingItems);
        getAllTodos();
    };
    return (
        <section className='vh-100' style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card-rounded-3">
                            <div className="card-body p-4">
                                <h4 className='text-content my-3 pb-3'>
                                    My Todo App
                                </h4>
                                <form onSubmit={handleAdd} action="" className='row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2'>
                                    <div className="col-12">
                                        <div className="form-outline">
                                            <input type="text" name="name"
                                                value={input.name}
                                                onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }}
                                                placeholder='Enter Task Here' id="form1" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type='submit' className='btn btn-primary'> Save</button>
                                    </div>
                                </form>
                                <table className='table mb-4'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>No.</th>
                                            <th scope='col'>Todo item</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data && data.length > 0 ?
                                                (
                                                    data.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope='row'>{item.id}</th>
                                                                <td>{item.name}</td>
                                                                <td>
                                                                    <Link to={`/edit/${item.id}`}>
                                                                        <button type='submit' className='btn btn-primary ms-1'><i className='fa fa-pencil'></i>Edit</button>
                                                                    </Link>
                                                                    <button onClick={() => handleDelte(item.id)} type='submit' className='btn btn-danger ms-1'><i className='fa fa-trash'></i>Delete</button>
                                                                </td>
                                                            </tr>

                                                        )
                                                    })
                                                )
                                                :
                                                <tr><td>No Table Found</td></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home