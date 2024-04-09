import React from 'react';

export function ShoWTodos({ title, description }) {
    console.log(title)
    return (
        <div>
            <h3>Title: {title}</h3>
            <p>Description: {description}</p>
        </div>
    );
}
