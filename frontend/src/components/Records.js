import React, { useEffect, useState } from "react";
import axios from "axios";

function Records() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/registrations"
      );

      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/registrations/${id}`
      );

      alert("Student deleted successfully");

      fetchRecords();
    } catch (error) {
      console.log(error);
      alert("Error deleting student");
    }
  };

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase()) ||
    record.email.toLowerCase().includes(search.toLowerCase()) ||
    record.technology.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Registered Students</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, email or technology..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Technology</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.technology}</td>
                <td>{record.status}</td>
                <td>
                  <button
                    onClick={() => deleteRecord(record._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Records;