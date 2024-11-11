import React, { createContext, useState } from 'react';
// Create a context for the list items
const ListItemContext = createContext();

// Create a provider component
const ListItemProvider = ({ children }) => {
    const [listItems, setListItems] = useState([]);

    const addItem = (item) => {
        const newItem = { ...item, id: item.id };
        setListItems([...listItems, newItem]);
    };

    const removeItem = (id) => {
        setListItems(listItems.filter(item => item.id !== id));
    };

    
    const editItem = (id, updatedItem) => {
        setListItems(listItems.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    };

    return (
        <ListItemContext.Provider value={{ listItems, addItem, removeItem, editItem }}>
            {children}
        </ListItemContext.Provider>
    );
};

export { ListItemContext, ListItemProvider };