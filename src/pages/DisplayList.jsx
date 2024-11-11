// import { useContext } from 'react';
// import { ListItemContext } from '../Context/ListItemContext'
// import { useEffect } from 'react';
// import initialState from '../utilities/data';
// import { useReducer } from 'react';


// export default function DisplayList() {
//     const { listItems, removeItem, editItem } = useContext(ListItemContext);


//     const { setListItems } = useContext(ListItemContext);

    
//     // Sort listItems from high to low based on Difficulty
//     const sortedListItems = listItems.sort((a, b) => b.id - a.id);
//     const toggleDone = (id) => {
//         const item = listItems.find(item => item.id === id);
//         if (item) {
//             editItem(id, { Done: !item.Done });
//         }
//     };
    
//     return (
//         <div>
//             <h2>Items List</h2>
//             <ul>
//                 {sortedListItems && sortedListItems.map((item, index) => (
//                     <li key={index}>
//                         {item.TaskName} - {item.description} - {item.Difficulty}
//                         <input type="checkbox" checked={item.Done }  onChange={() => toggleDone(item.id)}/>
//                          <button onClick={() => removeItem(index)}  disabled={!item.Done}>Delete</button>
//                          <button onClick={() => editItem(item.id, { ...item, Done: !item.Done })}>Edit</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

import React, { useContext, useReducer } from 'react';
import { ListItemContext } from '../Context/ListItemContext';

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


    return (
        <div>
            <h2>Items List</h2>
            <ul>
            {sortedListItems && sortedListItems.map((item) => (
                 <li key={item.id}>
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
                                {item.TaskName} - {item.description} - {item.Difficulty}
                                <input
                                    type="checkbox"
                                    checked={item.Done}
                                    onChange={() => toggleDone(item.id)}
                                />
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