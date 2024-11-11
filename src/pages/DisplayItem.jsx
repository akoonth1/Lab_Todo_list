import React, { useContext } from 'react';
import { ListItemContext } from '../Context/ListItemContext';

const DisplayItem = () => {
    const { listItems } = useContext(ListItemContext);
    console.log(listItems);
    return (
        <div>
            <h2>Items List</h2>
            <ul>
                {listItems
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map(item => (
                        <li key={item.id}>
                            {item.TaskName} - {item.description} - {item.Difficulty} - {item.Done ? 'Done' : 'Not Done'}
                        </li>
                    ))
                }
               
            </ul>
        </div>
    );
}

export default DisplayItem;
