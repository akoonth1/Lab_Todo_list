import { Link } from 'react-router-dom';
import './Nav.css'; // Import the CSS file for styling

export default function Nav() {    
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">List</Link>
                </li>
                <li className="nav-item">
                    <Link to="/CreateItem" className="nav-link">Create Item</Link>
                </li>
            </ul>
        </nav>
    );
}