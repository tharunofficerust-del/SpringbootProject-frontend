import "../styles/Header.css";

function Header() {
    return (
        <div className="header">
            <div>
                <h2>Vessel Schedule Delay & ETA Risk Management</h2>
                <p>Shipping Operations Dashboard</p>
            </div>

            <div className="header-right">
                <span>16 July 2026</span>
            </div>
        </div>
    );
}

export default Header;