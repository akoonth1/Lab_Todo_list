
import React, { useContext, useReducer, useState, useEffect } from 'react';
import { ListItemContext } from '../Context/ListItemContext';
import './DisplayList.css';

const initialState = {
    editingId: null,
    editedName: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'START_EDIT':
            return {
                ...state,
                editingId: action.id,
                editedName: action.name
            };
        case 'SET_EDITED_NAME':
            return {
                ...state,
                editedName: action.name
            };
        case 'STOP_EDIT':
            return initialState;
        default:
            return state;
    }
}

export default function DisplayList() {
    const { listItems, removeItem, editItem } = useContext(ListItemContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [filter, setFilter] = useState({ difficulty: '', done: '', time: '', important: '' });
    const [filteredListItems, setFilteredListItems] = useState([]);

 

    const toggleDone = (id) => {
        const item = listItems.find(item => item.id === id);
        if (item) {
            editItem(id, { Done: !item.Done });
        }
    };

    const handleEdit = (id, name) => {
        dispatch({ type: 'START_EDIT', id, name });
    };

    const handleSave = (id) => {
        editItem(id, { TaskName: state.editedName });
        dispatch({ type: 'STOP_EDIT' });
    };

    const handleRemove = (id) => {  
        removeItem(id);
        console.log('removing:', id);
        dispatch({ type: 'STOP_EDIT' });
    }
    
    const sortedListItems = listItems.sort((a, b) => b.id - a.id);

    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    // const filteredListItems = listItems
    //     .filter(item => (filter.difficulty ? item.Difficulty === filter.difficulty : true))
    //     .filter(item => (filter.done ? (filter.done === 'true' ? item.Done : !item.Done) : true))
    //     .sort((a, b) => b.id - a.id);

    useEffect(() => {
        const filteredItems = listItems
            .filter(item => (filter.difficulty ? item.Difficulty === filter.difficulty : true))
            .filter(item => (filter.done ? (filter.done === 'true' ? item.Done : !item.Done) : true))
            .filter(item => (filter.time ? (filter.done === 'false' ? item.Time : !item.Time) : true))
            .filter(item => (filter.important ? (filter.important === 'true' ? item.Important : !item.Important) : true))
            .sort((a, b) => b.id - a.id);
        setFilteredListItems(filteredItems);
    }, [listItems, filter]);

    return (

          <div>
            <h2>Items List</h2>
            <div className="filters">
                <label>
                    Difficulty:
                    <select name="difficulty" value={filter.difficulty} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label>
                    Done:
                    <select name="done" value={filter.done} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="true">Done</option>
                        <option value="false">Not Done</option>
                    </select>
                </label>
                {/* <label>
                    Time:
                    <select name="time" value={filter.time} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="true">Time Sensitive</option>
                        <option value="false">Not Time Sensitive</option>
                    </select>
                </label>
                <label>
                    Important:
                    <select name="important" value={filter.important} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="true">Important</option>
                        <option value="false">Not Important</option>
                    </select>
                </label>     */}
            </div>
            <ul className='List_item'>
            {filteredListItems.map((item) =>(
                 <li key={item.id} className={item.Difficulty}>
                        {state.editingId === item.id ? (
                            <>
                                <input
                                    type="text"
                                    value={state.editedName}
                                    onChange={(e) => dispatch({ type: 'SET_EDITED_NAME', name: e.target.value })}
                                />
                                <button onClick={() => handleSave(item.id)}>Save</button>
                                <button onClick={() => dispatch({ type: 'STOP_EDIT' })}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {item.TaskName} | {item.description} | {item.Difficulty}
                                <input
                                    type="checkbox"
                                    checked={item.Done}
                                    onChange={() => toggleDone(item.id)}
                                /> {item.Done ? 'Done' : 'Not Done'}
                                <button onClick={() => handleRemove(item.id)} disabled={!item.Done}>Delete</button>
                                <button onClick={() => handleEdit(item.id, item.TaskName)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}