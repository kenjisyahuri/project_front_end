import React, { useState } from "react";
import axios from "axios";
import "./edithostmessagebroker.css";
import Swal from "sweetalert2"; // Import SweetAlert2

const EditHostMessageBroker = ({ host, onClose, onHostUpdated }) => {
  const [hostData, setHostData] = useState({ ...host });
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle perubahan input
  const handleChange = (e) => {
    setHostData({
      ...hostData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk memperbarui data host message broker
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${apiUrl}/host-msg-broker/${host.guid}`,
        hostData
      );
      onHostUpdated(response.data); // Kirim data host yang telah diperbarui ke parent component
      // SweetAlert success notification
      Swal.fire({
        title: "Success",
        text: "Host message broker berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      });
      onClose(); // Tutup modal setelah host message broker berhasil diperbarui
    } catch (error) {
      console.error("Error updating host message broker:", error);
      // SweetAlert error notification
      Swal.fire({
        title: "Error",
        text: "Gagal memperbarui host message broker!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="modal-backdrop d-flex justify-content-center align-items-center">
      <div className="modal-content p-4 rounded shadow">
        <div className="modal-header">
          <h2 className="h5">Edit Host Message Broker</h2>
          <button
            className="btn-close ms-auto"
            aria-label="Close"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.5rem",
            }}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Host
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={hostData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ipAddress" className="form-label">
                IP Address
              </label>
              <input
                type="text"
                className="form-control"
                name="ipAddress"
                value={hostData.ipAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                URL
              </label>
              <input
                type="text"
                className="form-control"
                name="url"
                value={hostData.url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={hostData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={hostData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brokerType" className="form-label">
                Broker Type
              </label>
              <select
                className="form-select"
                name="brokerType"
                value={hostData.brokerType}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Jenis Broker</option>
                <option value="RabbitMQ">RabbitMQ</option>
                <option value="Kafka">Kafka</option>
                <option value="ActiveMQ">ActiveMQ</option>
              </select>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 w-100"
            >
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHostMessageBroker;
