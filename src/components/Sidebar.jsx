import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaShip,
    FaBox,
    FaExclamationTriangle
} from "react-icons/fa";

function Sidebar() {
    return (
        <div className="sidebar">
            
            <div className="logo">
                <span>TV</span>
            </div>

            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaHome /> Dashboard
                </NavLink>

                <NavLink to="/vessels" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaShip /> Vessels
                </NavLink>

                <NavLink to="/shipments" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaBox /> Shipments
                </NavLink>

                <NavLink to="/delays" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaExclamationTriangle /> Delays
                </NavLink>
            </nav>

            <div className="footer">
                <p>Developed by Tharun</p>
            </div>

        </div>
    );
}

export default Sidebar;