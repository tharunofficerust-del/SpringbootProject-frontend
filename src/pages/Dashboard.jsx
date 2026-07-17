import "../styles/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">

            <h1>Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Vessels</h3>
                    <h1>25</h1>
                </div>

                <div className="dashboard-card">
                    <h3>Total Shipments</h3>
                    <h1>150</h1>
                </div>

                <div className="dashboard-card">
                    <h3>Total Delays</h3>
                    <h1>10</h1>
                </div>

                <div className="dashboard-card">
                    <h3>High Risk</h3>
                    <h1>5</h1>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;