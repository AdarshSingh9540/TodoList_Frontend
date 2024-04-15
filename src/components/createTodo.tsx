import { useState } from "react";

export function CreateTodo(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodo = () => {
        fetch("https://todo-backend-jade-iota.vercel.app/todo", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(async function(res) {
            const json = await res.json();
            alert("Todo added");
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
    };

    return (
        <div>
            <input 
                id="title" 
                className="m-2 p-2 border rounded-md" 
                type="text" 
                placeholder="title" 
                onChange={(e) => setTitle(e.target.value)} 
            /><br />
        
            <input 
                id="desc" 
                className="m-2 p-2 border rounded-md" 
                type="text" 
                placeholder="description" 
                onChange={(e) => setDescription(e.target.value)} 
            /><br />

            <div> 
                <button 
                    className="bg-red-600 text-white p-2 m-2 ml-14 rounded-md"
                    onClick={addTodo}
                >
                    Add a todo
                </button>
            </div>
        </div>
    );
}
