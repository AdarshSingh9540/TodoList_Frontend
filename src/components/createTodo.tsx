import { useState } from "react";

export function CreateTodo(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>
        <input id="title" className="m-2 p-2 border rounded-md" type="text" placeholder="title" onChange={function(e) {
            const value = e.target.value;
            setTitle(e.target.value);
        }}></input> <br />
    
        <input id="desc" 
        className="m-2 p-2 border rounded-md" 
        type="text" placeholder="description" onChange={function(e) {
            const value = e.target.value;
            setDescription(e.target.value);
        }}></input> <br />

       <div> <button 
        className="bg-red-600 text-white p-2 m-2 ml-14 rounded-md"
        onClick={() => {
            fetch("http://localhost:3001/todo", {
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
        }}>Add a todo</button></div>
    </div>
}