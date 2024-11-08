import React from 'react';

const DisplayItem = ({ items }) => {
    return (
        <div>
            <h2>Items List</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.TaskName} - {item.description} - {item.Difficulty}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayItem;