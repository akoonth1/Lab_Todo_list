import React, { useReducer, useState } from 'react';
import "./CreateItem.css";
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
    Subtasks: []
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
    const [currentId, setCurrentId] = useState(1);
    const [items, setItems] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { ...state, id: currentId };
        console.log('submitting:', newItem);
        setItems([...items, newItem]);
        setCurrentId(currentId + 1);
        dispatch({ type: 'RESET' });
    }

    return (
        <>
            <h2>Create a new item</h2>
            <form className="Line_form" onSubmit={handleSubmit}>
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
            <DisplayItem items={items} />
        </>
    );
}


// import { useReducer } from 'react';

// import React, { useState, useEffect } from 'react';
// import "./CreateItem.css";
// import DisplayItem from './DisplayItem';

// export default function CreateItem() {
//     const [item, setItem] = useState({
//         id: 0,
//         TaskName: '',
//         description: '',
//         Time: 0,
//         TimeSensetive: false,
//         Important: false,
//         Done: false,
//         Difficulty: 'medium'
//     });

//     const [currentId, setCurrentId] = useState(1);
//     const [items, setItems] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newItem = { ...item, id: currentId };
//         console.log('submitting:', newItem);
//         setItems([...items, newItem]);
//         setCurrentId(currentId + 1);
//         setItem({
//             id: 0,
//             TaskName: '',
//             description: '',
//             Time: 0,
//             TimeSensetive: false,
//             Important: false,
//             Done: false,
//             Difficulty: ''
//         });
//         // Reset the form or perform other actions as needed
//     }

//     return (
//         <>
//             <h2>Create a new item</h2>
//             <form className="Line_form" onSubmit={handleSubmit}>
//                 <label>
//                     Task:
//                     <input
//                         type="text"
//                         value={item.TaskName}
//                         onChange={(e) => setItem({ ...item, TaskName: e.target.value })}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Description:
//                     <input
//                         type="text"
//                         value={item.description}
//                         onChange={(e) => setItem({ ...item, description: e.target.value })}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Time:
//                     <input
//                         type="number"
//                         value={item.Time}
//                         onChange={(e) => setItem({ ...item, Time: e.target.value })}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Time Sensetive:
//                     <input
//                         type="checkbox"
//                         checked={item.TimeSensetive}
//                         onChange={(e) => setItem({ ...item, TimeSensetive: e.target.checked })}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Important:
//                     <input
//                         type="checkbox"
//                         checked={item.Important}
//                         onChange={(e) => setItem({ ...item, Important: e.target.checked })}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Done:
//                     <input
//                         type="checkbox"
//                         checked={item.Done}
//                         onChange={(e) => setItem({ ...item, Done: e.target.checked })}
//                     />
//                 </label>
//                 <br />
//                                 <label>
//                     Difficulty:
//                     <select
//                         value={item.Difficulty}
//                         onChange={(e) => setItem({ ...item, Difficulty: e.target.value })}
//                     >
                   
//                         <option value="easy">Easy</option>
//                         <option value="medium">Medium</option>
//                         <option value="hard">Hard</option>
//                     </select>
//                 </label>
//                 <br />
//                 <button type="submit">Create Item</button>
//             </form>
//             <DisplayItem items={items} />
//         </>
//     );
// }