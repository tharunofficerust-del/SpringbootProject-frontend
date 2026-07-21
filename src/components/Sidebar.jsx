import { NavLink } from "react-router-dom";
// import {
//     FaHome,
//     FaShip,
//     FaBox,
//     FaExclamationTriangle
// } from "react-icons/fa";

import {
    Ship,
    Package,
    AlertTriangle,
    LayoutDashboard
} from "lucide-react";

function Sidebar() {
    return (
        <div className="sidebar">
            
            <nav>

                <div className="menu-title">
                    MAIN MENU
                </div>

                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    <LayoutDashboard size={20} /> Dashboard
                </NavLink>

                <NavLink to="/vessels" className={({ isActive }) => isActive ? "active" : ""}>
                    <Ship size={20} />Vessels
                </NavLink>

                <NavLink to="/shipments" className={({ isActive }) => isActive ? "active" : ""}>
                   <Package size={20} /> Shipments
                </NavLink>

                <NavLink to="/delays" className={({ isActive }) => isActive ? "active" : ""}>
                    <AlertTriangle size={20} />Delays
                </NavLink>
            </nav>

            <div className="sidebar-bottom">

                 {/* <div className="logo">
                    <span>TV</span>
                </div> */}

                <div className="footer">
                    <p>Developed by Tharun Vijay</p>
                    <p>STEP Flow v1.0</p>
                </div>
            </div>
            

        </div>
    );
}

export default Sidebar;