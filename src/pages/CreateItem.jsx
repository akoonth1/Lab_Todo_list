import React, { useReducer, useState, useContext, useRef } from 'react';
import "./CreateItem.css";
import { ListItemContext } from '../Context/ListItemContext';
import DisplayItem from './DisplayItem';

const initialState = {
    id: 0,
    TaskName: '',
    description: '',
    Time: 0,
    TimeSensetive: false,
    Important: false,
    Done: false,
    Difficulty: 'medium',
    Subtasks: [],
    Dated : new Date()
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default function CreateItem() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentId, setCurrentId] = useState(0);
    const [items, setItems] = useState([]);
    const { addItem } = useContext(ListItemContext);
    const currentIdRef = useRef(0);
    const usedIdsRef = useRef([]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        usedIdsRef.current.push(currentIdRef.current);
        currentIdRef.current += 1;
        if (usedIdsRef.current.includes(currentIdRef.current)) {
            currentIdRef.current += 1;
        }
        const newItem = { ...state, id: currentId+1 };
        console.log('submitting:', newItem);
        setItems([...items, newItem]);
        addItem({...state, id: currentId });
        setCurrentId(currentId + 1);
    
        dispatch({ type: 'RESET' });
        console.log('usedIds:', usedIdsRef.current);
    }

    return (
        <>
            <h2>Create a new item</h2>
            <form className="Line_form" onSubmit={handleSubmit}>
                {/* <label>
                    Id:
                    <input
                        type="number"
                        value={currentId}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'id', value: e.target.value })}
                        required
                    />
                </label> */}

                <label>
                    Task:
                    <input
                        type="text"
                        value={state.TaskName}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'TaskName', value: e.target.value })}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={state.description}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
                        placeholder="description"
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="number"
                        value={state.Time}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'Time', value: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Time Sensetive:
                    <input
                        type="checkbox"
                        checked={state.TimeSensetive}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'TimeSensetive', value: e.target.checked })}
                    />
                </label>
                <br />
                <label>
                    Important:
                    <input
                        type="checkbox"
                        checked={state.Important}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'Important', value: e.target.checked })}
                    />
                </label>
                <br />
                {/* <label>
                    Done:
                    <input
                        type="checkbox"
                        checked={state.Done}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'Done', value: e.target.checked })}
                    />
                </label> */}
                <br />
                <label>
                    Difficulty:
                    <select
                        value={state.Difficulty}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'Difficulty', value: e.target.value })}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <br />
                <button type="submit">Create Item</button>
            </form>
            <DisplayItem items={items} className={items.Difficulty}/>
        </>
    );
}

