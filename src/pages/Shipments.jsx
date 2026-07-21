import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Shipments.css";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import {
    Ship,
    Package,
    AlertTriangle,
    LayoutDashboard,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function Shipments() {

  const [shipment, setShipment] = useState({   //input states
      shipmentReference: "",
      customerName: "",
      cargoType: "GENERAL",
      cargoWeight: "0",
      priority: "LOW",
      requiredDeliveryDate: "",
      voyageNumber: ""
  });

  const [shipments, setShipments] = useState([]);     //fetching shipments in array

  const [vessels, setVessels] = useState([]);         //for vessel no

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);      // for pagination

  const fetchShipments = async () => {
      try {
          const response = await api.get(
              `/shipments?page=${currentPage}&size=5&sortBy=id&direction=desc`
          );
          setShipments(
              response.data.shipments
          );
          setTotalPages(
              response.data.totalPages
          );
      } catch (error) {
          console.error(
              "Failed to fetch shipments:",
              error
          );
          toast.error(
              error.response?.data?.message ||
              "Unable to load shipments."
          );
      }
  };


    const fetchVessels = async () => {
        const response = await api.get(
            "/vessels/schedules?page=0&size=100"
        );
        setVessels(
            response.data.vessels
        );
    };

    //to fetch data when dom changes
    useEffect(() => {

        fetchShipments();

    }, [currentPage]);
    //fetch vessels for dropdown
    useEffect(() => {

        fetchVessels();

    }, []);

    const handleChange = (e) => {
          setShipment({
              ...shipment,
              [e.target.name]: e.target.value
          });
          //console.log(shipment);

      };

      const handleSubmit = async () => {
            try {
              setLoading(true);

                await api.post(
                    "/shipments",
                    shipment
                );

              setLoading(false);
                toast.success(
                    "Shipment created successfully!"
                );

                fetchShipments();

                setShipment({
                    shipmentReference: "",
                    customerName: "",
                    cargoType: "GENERAL",
                    cargoWeight: "",
                    priority: "LOW",
                    requiredDeliveryDate: "",
                    voyageNumber: ""
                });
            } catch (error) {
                setLoading(false);
                 console.log(error);

                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong."
                );
            }
        };

        const [loading, setLoading] = useState(false);
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

  return (
      <div className="shipments-page">

          <h1 className="page-title"><Package size={35} /> Shipment Management</h1>

          <div className="shipment-container">

              <div className="shipment-form">

                <h2>Create Shipment</h2>

                {/* row 01 */}
                <div className="form-row">
                  <div className="form-group">
                      <label>
                          Shipment Reference
                      </label>
                      <input
                          type="text"
                          name="shipmentReference"
                          value={shipment.shipmentReference}
                          onChange={handleChange}
                      />
                  </div>
                  <div className="form-group">
                      <label>
                          Customer Name
                      </label>
                      <input
                          type="text"
                          name="customerName"
                          value={shipment.customerName}
                          onChange={handleChange}
                      />
                  </div>
                </div>

                {/* row 02 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Cargo Type</label>
                        <select
                            name="cargoType"
                            value={shipment.cargoType}
                            onChange={handleChange}
                        >
                            <option>GENERAL</option>
                            <option>REEFER</option>
                            <option>HAZARDOUS</option>
                            <option>FRAGILE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Cargo Weight</label>
                        <input
                            type="number"
                            name="cargoWeight"
                            value={shipment.cargoWeight}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                
                {/* row 03 */}
                <div className="form-row">
                      <div className="form-group">
                        <label>Priority</label>
                        <select
                            name="priority"
                            value={shipment.priority}
                            onChange={handleChange}
                        >
                            <option>LOW</option>
                            <option>MEDIUM</option>
                            <option>HIGH</option>
                            <option>CRITICAL</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Select Voyage </label>
                        <select
                            name="voyageNumber"
                            value={shipment.voyageNumber}
                            onChange={handleChange}
                        >
                            <option>Select Vessel</option>

                            {
                                vessels.map((vessel) => (
                                    <option
                                        key={vessel.voyageNumber}
                                        value={vessel.voyageNumber}
                                    >
                                        {vessel.voyageNumber}
                                    </option>
                                ))
                            }
                        </select>
                      </div>
                </div>

                {/* row 4 */}
                      <div className="form-row">
                          <div className="form-group">
                              <label>
                                  Required Delivery Date
                              </label>

                              <input
                                  type="datetime-local"
                                  name="requiredDeliveryDate"
                                  value={shipment.requiredDeliveryDate}
                                  onChange={handleChange}
                              />
                          </div>
                      </div>
                      <button className="save-btn" onClick={handleSubmit} disabled={loading} >
                          <Save size={20} />{loading ? "Saving..." : "Save Shipment"}
                      </button>
              </div>
{/* ---------------------------------------------------------------------------------------- */}
              <div className="shipment-table">

                  <h2>Shipment List</h2>

                  <table>

                      <thead>

                          <tr>
                              <th>Reference</th>
                              <th>Customer</th>
                              <th>Cargo Type</th>
                              <th>Weight</th>
                              <th>Priority</th>
                              <th>Voyage</th>
                              <th>Delivery Date</th>
                              <th>Status</th>
                          </tr>

                      </thead>

                      <tbody>
                        {
                          shipments.map((shipment) => (

                              <tr
                                  key={shipment.shipmentReference}
                              >

                                  <td>
                                      {shipment.shipmentReference}
                                  </td>

                                  <td>
                                      {shipment.customerName}
                                  </td>

                                  <td>
                                      {shipment.cargoType}
                                  </td>

                                  <td>
                                      {shipment.cargoWeight}
                                  </td>

                                  <td>
                                      <span className={`priority ${shipment.priority}`}>
                                          {shipment.priority}
                                      </span>
                                  </td>

                                  <td>
                                      {shipment.voyageNumber}
                                  </td>

                                  <td>
                                      {
                                          formatDate(
                                              shipment.requiredDeliveryDate
                                          )
                                      }
                                  </td>
                                  <td>

                                      <span
                                          className={`shipment-status ${shipment.shipmentStatus}`}
                                      >
                                          {shipment.shipmentStatus}
                                      </span>

                                  </td>

                              </tr>

                          ))
                      }

                      </tbody>

                  </table>

              </div>
{/* ----------------------------------------------------------------------------------- */}
                  
                  {/* pagination sets the currentpage value, 
                  useeffect() takes care the page reload */}
                  
                  <div className="pagination">
                      <button
                          onClick={() =>
                              setCurrentPage(
                                  currentPage - 1
                              )
                          }
                          disabled={currentPage === 0}
                      >
                         <ChevronLeft size={18} /> Previous
                      </button>

                      <span>
                          Page {currentPage + 1} of {totalPages}
                      </span>

                      <button
                          onClick={() =>
                              setCurrentPage(
                                  currentPage + 1
                              )
                          }
                          disabled={
                              currentPage === totalPages - 1
                          }
                      >
                          Next <ChevronRight size={18} />
                      </button>

                  </div>
          </div>

      </div>
  );
}

export default Shipments