import React, { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo } from './components/createTodo';
import axios from 'axios';
import {SignUp} from './components/SignUp';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean; 
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

  const toggleCompletion = async (id: string) => {
    try {
      const updatedTodos = todos.map(todo => {
        if (todo._id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          setTodos(prevTodos => [...prevTodos.filter(t => t._id !== id), updatedTodo]);
          return updatedTodo;
        }
        return todo;
      });
      await axios.put(`https://todo-backend-jade-iota.vercel.app/todo/${id}`, { completed: !todos.find(todo => todo._id === id)?.completed });
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };
  

const addTodo = async (newTodo: Todo) => {
  try {
    console.log('Adding todo:', newTodo);
    await fetch("https://todo-backend-jade-iota.vercel.app/todo", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json"
      }
    });
    console.log('Todo added successfully');
    await fetchTodos(); 
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};



  useEffect(() => {
    fetchTodos();
  }, [todos]);

  return (
   <>
   <div className='bg-red-700'>
    <h1 className='text-white p-4 text-3xl font-serif font-bold flex items-center justify-center'>Add Task</h1>
   </div>
    <div className='flex flex-col md:flex md:flex-row min-h-screen bg-black justify-evenly'>
      <div className='flex flex-col p-6 rounded-lg'>
        <CreateTodo addTodo={addTodo} />
      </div>

      <div className="mt-4 ">
        <h2 className='text-white font-bold text-xl m-4'>Your Todo List</h2>
        {todos.map((todo: Todo, index: number) => (
          <div key={todo._id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex md:flex-row justify-between ">
            <div>
              <h2 className="text-lg font-semibold">{`${index + 1}. ${todo.title}`}</h2>
              <p className="text-gray-600">{todo.description}</p>
            </div>
            <div className='mt-2 md:mt-0 flex flex-row md:justify-between items-center'>
              {todo.completed ? (
                <span className='text-green-500 font-bold'><img src="https://cdn1.iconfinder.com/data/icons/warnings-and-dangers/400/Warning-02-512.png" className='w-6' alt="" /></span>
              ) : (
                <button onClick={() => toggleCompletion(todo._id)} className='bg-yellow-400 hover:bg-yellow-600 text-white rounded-md px-4 py-2 mx-2'>Mark as completed</button>
              )}
              <button onClick={() => deleteTodo(todo._id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ml-2'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <SignUp/>
   </>
  );
}

export default App;
