import React, { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo } from './components/createTodo';
import { Todos } from './components/Todos';
import { ShoWTodos } from './components/ShowTodos';
import axios from 'axios';

interface Todo {
  _id: string;
  title: string;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); 

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://todo-backend-jade-iota.vercel.app/todos");
      const json = await response.json(); 
      setTodos(json.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`https://todo-backend-jade-iota.vercel.app/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen '>
            <div className='flex flex-col items-center bg-blue-500 p-6 rounded-lg'>
        <h1 className='text-white font-bold text-xl'>Todo List</h1>
        <CreateTodo /> 
        <div>
          {todos.map((todo: Todo) => (
            <div key={todo._id}>
              <ShoWTodos
                title={todo.title}
                description={todo.description}
              />
              <button onClick={() => deleteTodo(todo._id)} className='bg-blue-600 text-white'>Delete</button>
            </div>
          ))}
          <button onClick={fetchTodos} className='bg-green-500 p-2 hover:bg-green-600 text-white rounded-md font-semibold'>Show Todo</button>
        </div>
      </div>
    </div>
  );
}

export default App;
