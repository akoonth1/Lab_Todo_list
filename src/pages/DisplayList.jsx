import initialState from "../utilities/data";

export default function DisplayList() {
    return (
        <div>
            <h2>Items List</h2>
            <ul>
                {initialState.map(item => (
                    <li key={item.id}>
                        {item.title} - {item.description} - {item.Difficulty}
                    </li>
                ))}
            </ul>
        </div>
    );
}
