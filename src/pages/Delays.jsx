import React from 'react'
import "../styles/Delays.css";
import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { ImTextColor } from 'react-icons/im';


function Delays() {

  const [delay, setDelay] = useState({
    voyageNumber: "",
    delayReason: "PORT_CONGESTION",
    delayHours: "0",
    reportedPort: "",
    remarks: "",
    reportedDate: ""
  });

  const [delays, setDelays] = useState([]);

  const [vessels, setVessels] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDelay({
      ...delay,
      [e.target.name]: e.target.value
    });

  };

  const fetchVessels = async () => {
        try {
            const response = await api.get(
                "/vessels/schedules?page=0&size=100"
            );

            setVessels(
                response.data.vessels
            );

        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    };

    useEffect(() => {

        fetchVessels();
        fetchDelays();

    }, []);


    //submit 
  const handleSubmit = async () => {

        try {

            setLoading(true);

            if (editingId) {

                await api.put(
                    `/delays/${editingId}`,
                    delay
                );

                toast.success(
                    "Delay updated successfully."
                );

            } else {

                await api.post(
                    "/delays",
                    delay
                );

                toast.success(
                    "Delay created successfully."
                );
            }

            setEditingId(null);

            setDelay({
                voyageNumber: "",
                delayReason: "PORT_CONGESTION",
                delayHours: "",
                reportedPort: "",
                reportedDate: "",
                remarks: ""
            });

            fetchDelays();
            fetchVessels();

        } catch (error) {

            console.log(
                "Delay API Error:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                (editingId
                    ? "Failed to update delay."
                    : "Failed to create delay.")
            );

        } finally {

            setLoading(false);
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
            console.error(
                "Failed to fetch delays:",
                error
            );
            toast.error(
                error.response?.data?.message ||
                "Unable to load delay reports."
            );
        }
    };

    const [editingId, setEditingId] = useState(null);

    const handleEdit = (delay) => {

          setEditingId(delay.id);

          setDelay({
              voyageNumber: delay.voyageNumber,
              delayReason: delay.delayReason,
              delayHours: delay.delayHours,
              reportedPort: delay.reportedPort,
              reportedDate: delay.reportedDate,
              remarks: delay.remarks || "Updated Delay"
          });

          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      };

      const handleDelete = async (id) => {

       const confirmed = window.confirm(
            "Delete this delay report?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/delays/${id}`
            );

            toast.success(
                "Delay deleted successfully."
            );

            fetchDelays();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete delay."
            );
        }
    };


  return (

    <div className="delay-page">

      <h1>Delay Management</h1>

      <div className="delay-container">
        
        <div className="delay-form">

          <div className="form-row">

              <div className="form-group">
                  <label>Voyage Number</label>

                  <select
                      name="voyageNumber"
                      value={delay.voyageNumber}
                      onChange={handleChange}
                  >
                      <option value="">
                          Select Vessel
                      </option>

                      {vessels?.map((vessel) => (
                          <option
                              key={vessel.voyageNumber}
                              value={vessel.voyageNumber}
                          >
                              {vessel.vesselName} ({vessel.voyageNumber}) - {vessel.scheduleStatus}
                          </option>
                      ))}
                  </select>
              </div>

              <div className="form-group">

                  <label>Delay Reason</label>

                  <select
                      name="delayReason"
                      value={delay.delayReason}
                      onChange={handleChange}
                  >
                      <option>PORT_CONGESTION</option>
                      <option>BAD_WEATHER</option>
                      <option>CUSTOMS_HOLD</option>
                      <option>VESSEL_BREAKDOWN</option>
                      <option>DOCUMENT_ISSUE</option>
                  </select>

              </div>

          </div>

          <div className="form-row">

              <div className="form-group">
                  <label>Delay Hours</label>

                  <input
                      type="number"
                      name="delayHours"
                      value={delay.delayHours}
                      onChange={handleChange}
                  />
              </div>

              <div className="form-group">
                  <label>Reported Port</label>

                  <input
                      type="text"
                      name="reportedPort"
                      value={delay.reportedPort}
                      onChange={handleChange}
                  />
              </div>

          </div>

          <div className="form-row">

              <div className="form-group">

                  <label>Reported Date</label>

                  <input
                      type="date"
                      name="reportedDate"
                      value={delay.reportedDate}
                      onChange={handleChange}
                  />

              </div>

          </div>

          <div className="form-row">

              <div className="form-group">

                  <label>Remarks</label>

                  <textarea
                      name="remarks"
                      value={delay.remarks}
                      onChange={handleChange}
                      rows="4"
                  />

              </div>

          </div>

          <button
              className="save-btn"
              onClick={handleSubmit}
              
          >
              {
                  editingId
                      ? "Update Delay"
                      : "Create Delay"
              }
          </button>

      </div>

        <div className="delay-table">

          <h2>Delays List</h2>

          <table>

                <thead>

                    <tr>

                        <th>Voyage</th>
                        <th>Reason</th>
                        <th>Delay Hours</th>
                        <th>Reported Port</th>
                        <th>Reported Date</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                  <tbody>

                      {
                          delays?.map((delay) => (

                              <tr
                                  key={delay.id}
                              >

                                  <td>{delay.voyageNumber}</td>

                                  <td>
                                      {delay.delayReason}
                                  </td>

                                  <td className='delay-hours '>
                                      {delay.delayHours}
                                  </td>

                                  <td>
                                      {delay.reportedPort}
                                  </td>

                                  <td>
                                      {delay.reportedDate}
                                  </td>

                                  <td className="action-cell">

                                      <button
                                          className="edit-btn"
                                          onClick={() =>
                                              handleEdit(delay)
                                          }
                                      >
                                          Edit
                                      </button>

                                      <button
                                          className="delete-btn"
                                          onClick={() =>
                                              handleDelete(delay.id)
                                          }
                                      >
                                          Delete
                                      </button>

                                  </td>

                              </tr>

                          ))
                      }

                      </tbody>

            </table>

        </div>
      </div>

    </div>

  )



}

export default Delays