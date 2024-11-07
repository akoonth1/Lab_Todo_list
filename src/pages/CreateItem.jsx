import React from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import "./CreateItem.css";

export default function CreateItem() {

    const [item, setItem] = useState({
        id: 0,
        name: '',
        description: '',
        Time: 0,
        TimeSensetive: false,
        Important: false,
        Done: false,
        Difficulty: ''
    });



return (
<>
<h2>Create a new item</h2>
<form className="Line_form">
    <label>
        Name:
        <input type="text" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
    </label>
    <br />
    <label>
        Description:
        <input type="text" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
    </label>
    <br />
    <label>
        Time:
        <input type="number" value={item.Time} onChange={(e) => setItem({ ...item, Time: e.target.value })} />
    </label>
    <br />
    <label>
        Time Sensetive:
        <input type="checkbox" checked={item.TimeSensetive} onChange={(e) => setItem({ ...item, TimeSensetive: e.target.checked })} />
    </label>
    <br />
    <label>
        Important:
        <input type="checkbox" checked={item.Important} onChange={(e) => setItem({ ...item, Important: e.target.checked })} />
    </label>
    <br />
    {/* <label>
        Done:
        <input type="checkbox" checked={item.Done} onChange={(e) => setItem({ ...item, Done: e.target.checked })} />
    </label>
    <br /> */}
    <label>
        Difficulty:
        <select value={item.Difficulty} onChange={(e) => setItem({ ...item, Difficulty: e.target.value })}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </label>


    <button type="submit">Create</button>
</form>
</>
)
}