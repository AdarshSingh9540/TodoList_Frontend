import React, { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo } from './components/createTodo';
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

  // const updateTodo = async (id: string, updatedFields: Partial<Todo>) => {
  //   try {
  //     await axios.put(`https://todo-backend-jade-iota.vercel.app/todo/${id}`, updatedFields);
  //     fetchTodos(); 
  //   } catch (error) {
  //     console.error('Error updating todo:', error);
  //   }
  // };
  
  const addTodo = async (newTodo: Todo) => {
    try {
      await fetch("https://todo-backend-jade-iota.vercel.app/todo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json"
        }
      });
     
      fetchTodos(); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  return (
    <div className='flex flex-row min-h-screen bg-black justify-evenly'>
      <div className='flex flex-col p-6 rounded-lg'>
        {/* <h1 className='text-white font-bold text-2xl'>Todo List</h1> */}
        <CreateTodo addTodo={addTodo} /> 
      </div>

      <div className="mt-4">
        <h2 className='text-white font-bold text-xl m-4'>Your Todo List</h2>
        {todos.map((todo: Todo, index: number) => (
          <div key={todo._id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{`${index + 1}. ${todo.title}`}</h2>
              <p className="text-gray-600">{todo.description}</p>
            </div>
            <div>
              {/* <button onClick={() => updateTodo(todo._id, { title: "Updated Title", description: "Updated Description" })} className='bg-yellow-400 hover:bg-yellow-600 text-white rounded-md px-4 py-2 mx-2'>Update</button> */}
              <button onClick={() => deleteTodo(todo._id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ml-2'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
