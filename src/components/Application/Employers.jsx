import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from "../context/UserContextProvider";

const Employers = () => {
  // State to hold the list of employers
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(Context);


  const role = localStorage.getItem('role');
  if (role != "Admin") {
    return <div>You don't have permission to access the page</div>
  }
  // Function to fetch employers
  const fetchEmployers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/user/employer');
      setEmployers(response.data.users); // Adjust according to your API response structure
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error fetching employers');
      setLoading(false);
    }
  };

  // Function to handle is_active status toggle
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.patch(`http://localhost:4000/api/v1/user/employer/${id}`, {
        is_active: updatedStatus
      });
      // Update state with the new status
      setEmployers((prevEmployers) =>
        prevEmployers.map((employer) =>
          employer._id === id ? { ...employer, is_active: updatedStatus } : employer
        )
      );
    } catch (err) {
      setError(err.message || 'Error updating employer status');
    }
  };

  // useEffect to call fetchEmployers when component mounts
  useEffect(() => {
    fetchEmployers();
  }, []);

  return (
    <div>
      <h1>Employers List</h1>
      {loading && <p>Loading employers...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((employer) => (
              <tr key={employer._id}>
                <td>{employer.name}</td>
                <td>{employer.email}</td>
                <td>{employer.phone}</td>
                <td>{employer.role}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={employer.is_active}
                    onChange={() => handleToggleActive(employer._id, employer.is_active)}
                  />
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { Employers };
