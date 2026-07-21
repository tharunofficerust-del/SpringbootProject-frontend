import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {
    Ship,
    Package,
    AlertTriangle,
    LayoutDashboard
} from "lucide-react";

function Dashboard() {

    const [vessels, setVessels] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [delays, setDelays] = useState([]);

    const fetchVessels = async () => {
            try {
                const response =
                    await api.get(
                        "/vessels/schedules?page=0&size=100"
                    );

                setVessels(
                    response.data.vessels
                );
            } catch (error) {
                toast.error(
                    "Unable to load vessels."
                );
            }
        };

        const fetchShipments = async () => {
            try {
                const response =
                    await api.get(
                        "/shipments?page=0&size=100"
                    );

                setShipments(
                    response.data.shipments
                );

            } catch (error) {

                toast.error(
                    "Unable to load shipments."
                );
            }
        };

        const fetchDelays = async () => {
            try {
                const response =
                    await api.get(
                        "/delays"
                    );

                setDelays(
                    response.data
                );
            } catch (error) {

                toast.error(
                    "Unable to load delays."
                );
            }
        };

        useEffect(() => {
            fetchVessels();
            fetchShipments();
            fetchDelays();

        }, []);


        const totalVessels = vessels.length;
        const totalShipments = shipments.length;
        const totalDelays = delays.length;
        const inTransit =
            vessels.filter(
                vessel =>
                    vessel.scheduleStatus ===
                    "IN_TRANSIT"
            ).length;

        const arrived =
            vessels.filter(
                vessel =>
                    vessel.scheduleStatus ===
                    "ARRIVED"
            ).length;

        const atRisk =
            shipments.filter(
                shipment =>
                    shipment.shipmentStatus ===
                    "AT_RISK"
            ).length;

        const recentDelays = delays.slice(0, 5);


            console.log(
                totalVessels,
                totalShipments,
                totalDelays,
                inTransit,
                arrived,
                atRisk
            );
    return (
        <div className="dashboard">

            <h1 className="page-title"> <LayoutDashboard size={35} />  Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Vessels</h3>
                    <h1>{totalVessels}</h1>
                </div>

                <div className="dashboard-card">
                    <h3>Total Shipments</h3>
                    <h1>{totalShipments}</h1>
                </div>

                <div className="dashboard-card">
                    <h3>Total Delays</h3>
                    <h1>{totalDelays}</h1>
                </div>

                <div className="dashboard-card transit-card">
                    <h3>In Transit Vessels</h3>
                    <h1>{inTransit}</h1>
                </div>

                <div className="dashboard-card arrived-card">
                    <h3>Arrived Vessels</h3>
                    <h1>{arrived}</h1>
                </div>

                <div className="dashboard-card risk-card">
                    <h3>At Risk Shipments</h3>
                    <h1>{atRisk}</h1>
                </div>

            </div>

            <div className="dashboard-section">

                <div className="dashboard-box">

                    <h2>Recent Delay Reports</h2>

                    {
                        recentDelays.map((delay) => (

                            <div
                                className="dashboard-item"
                                key={delay.id}
                            >
                                <span>
                                    {delay.voyageNumber}
                                </span>

                                <span>
                                    {delay.delayHours} Hrs
                                </span>
                            </div>

                        ))
                    }

                </div>

                <div className="dashboard-box">

                    <h2>Upcoming Arrivals</h2>

                    {
                        vessels
                            .filter(
                                vessel =>
                                    vessel.scheduleStatus !==
                                    "ARRIVED"
                            )
                            .slice(0, 5)
                            .map((vessel) => (

                                <div
                                    className="dashboard-item"
                                    key={vessel.id}
                                >
                                    <span>
                                        {vessel.voyageNumber}
                                    </span>

                                    <span>
                                        {new Date(
                                            vessel.plannedArrivalDate
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                            ))
                    }

                </div>

            </div>

            

            

        </div>
    );
}

export default Dashboard;