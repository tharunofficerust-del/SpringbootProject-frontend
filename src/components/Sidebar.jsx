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
                <NavLink to="/">
                    <FaHome /> Dashboard
                </NavLink>

                <NavLink to="/vessels">
                    <FaShip /> Vessels
                </NavLink>

                <NavLink to="/shipments">
                    <FaBox /> Shipments
                </NavLink>

                <NavLink to="/delays">
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