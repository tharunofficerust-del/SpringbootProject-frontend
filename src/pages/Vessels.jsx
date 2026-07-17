import { useState , useEffect } from "react";
import "../styles/Vessels.css";
import api from "../services/api";
import { toast } from "react-toastify";

function Vessels() {

    //for fetching vessels from backend
    const [vessels, setVessels] = useState([]);
    //pagination states
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchVessels = async () => {

    const response = await api.get(
                `/vessels/schedules?page=${page}&size=5`
            );

            setVessels(response.data.vessels);
            setTotalPages(response.data.totalPages);
        };

        useEffect(() => {
            fetchVessels();
        }, [page]);

    const [vessel, setVessel] = useState({
        vesselName: "",
        voyageNumber: "",
        originPort: "",
        destinationPort: "",
        plannedDepartureDate: "",
        plannedArrivalDate: "",
        vesselCapacityTEU: "",
        scheduleStatus: "PLANNED"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
            setVessel({
                ...vessel,
                [name]: value
            });
    };

    const handleStatusChange = (
        voyageNumber,
        newStatus
    ) => {

        console.log(
            voyageNumber,
            newStatus
        );
    };


    //submit part with the toast library for success and error messages

    const handleSubmit = async () => {

        try {

            const response = await api.post(
                "/vessels/schedules",
                vessel
            );
                toast.success("Vessel Created Successfully!");
               

            fetchVessels(); //fetching after posting.

                console.log("Posted successfully:") //just testing - remove showing actual data after fixing

        } catch(error){

            Object.values(
                error.response.data
            ).forEach((message)=>{

                toast.error(message);

            });

        }
    };

    //for formatting date from backend
    const formatDate = (date) => {
        return new Date(date)
            .toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );
    };

    //for status change
    const getAvailableStatuses = (
            currentStatus
        ) => {

            switch (currentStatus) {

                case "PLANNED":
                    return [
                        "DEPARTED",
                        "CANCELLED"
                    ];

                case "DEPARTED":
                    return [
                        "IN_TRANSIT"
                    ];

                case "IN_TRANSIT":
                    return [
                        "ARRIVED"
                    ];

                default:
                    return [];
            }
        };


    return (
        <div className="vessels-container">

            <h1>Vessels</h1>

            <div className="vessel-form">

                <h2>Add Vessel</h2>

                <div className="form-row">
                    <div className="form-group">
                        <label>Voyage Number</label>

                        <input
                            type="text"
                            name="voyageNumber"
                            value={vessel.voyageNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Vessel Name</label>

                        <input
                            type="text"
                            name="vesselName"
                            value={vessel.vesselName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Origin Port</label>

                        <input
                            type="text"
                            name="originPort"
                            value={vessel.originPort}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Destination Port</label>

                        <input
                            type="text"
                            name="destinationPort"
                            value={vessel.destinationPort}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Planned Departure</label>

                        <input
                            type="datetime-local"
                            name="plannedDepartureDate"
                            value={vessel.plannedDepartureDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Planned Arrival</label>

                        <input
                            type="datetime-local"
                            name="plannedArrivalDate"
                            value={vessel.plannedArrivalDate}
                            onChange={handleChange}
                        />
                    </div>

                </div>


                <div className="form-row">
                    <div className="form-group">
                        <label>Vessel Capacity (TEU)</label>

                        <input
                            type="number"
                            name="vesselCapacityTEU"
                            value={vessel.vesselCapacityTEU}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Schedule Status</label>

                        <select
                            name="scheduleStatus"
                            value={vessel.scheduleStatus}
                            onChange={handleChange}
                            onClick={() =>
                                toast.info(
                                    "New vessels can only be created with PLANNED status."
                                )
                            }
                        >
                            <option value="PLANNED">
                                PLANNED
                            </option>

                        </select>
                    </div>
                </div>
                
               

                <button className="save-btn" onClick={handleSubmit}>
                    Save Vessel
                </button>

            </div>

            <div className="vessel-table">

                <h2>Vessel List</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Voyage Number</th>
                            <th>Vessel Name</th>
                            <th>Origin</th>
                            <th>Planned Departure Date</th>
                            <th>Destination</th>
                            <th>Planned Arrival Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            vessels.map((vessel) => (
                                <tr key={vessel.id}>
                                    <td>{vessel.voyageNumber}</td>
                                    <td>{vessel.vesselName}</td>
                                    <td>{vessel.originPort}</td>
                                    <td>
                                        {formatDate(
                                            vessel.plannedDepartureDate
                                        )}
                                    </td>
                                    <td>{vessel.destinationPort}</td>
                                    <td>
                                        {formatDate(
                                            vessel.plannedArrivalDate
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            className={
                                                `status ${vessel.scheduleStatus}`
                                            }
                                        >
                                            {vessel.scheduleStatus}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        { getAvailableStatuses( vessel.scheduleStatus).length > 0 ?
                                            (
                                                <select
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            vessel.voyageNumber,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option>
                                                        Change Status
                                                    </option>
                                                    {
                                                        getAvailableStatuses(
                                                            vessel.scheduleStatus
                                                        ).map((status) => (

                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>

                                                        ))
                                                    }
                                                </select>
                                            )
                                            :
                                            (
                                                <span className="final-status">
                                                    FINAL
                                                </span>
                                            )
                                        }

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

                <div className="pagination">

                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Vessels;