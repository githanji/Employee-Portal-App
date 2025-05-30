import React, { useState } from 'react';

function EmployeeSearch({ employees, setEmployees }) {
  const [filters, setFilters] = useState({
    id: '',
    firstName: '',
    lastName: '',
    loginId: '',
    dobFrom: '',
    dobTo: '',
    department: '',
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    setEmployees(employees.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredEmployees = employees.filter((e) => {
    const dob = new Date(e.dob);
    const dobFrom = filters.dobFrom ? new Date(filters.dobFrom) : null;
    const dobTo = filters.dobTo ? new Date(filters.dobTo) : null;

    return (
      (!filters.id || e.id.includes(filters.id)) &&
      (!filters.firstName || e.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
      (!filters.lastName || e.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
      (!filters.loginId || e.loginId.includes(filters.loginId)) &&
      (!filters.department || e.department === filters.department) &&
      (!dobFrom || dob >= dobFrom) &&
      (!dobTo || dob <= dobTo)
    );
  });

  const paginated = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const styles = {
    container: {
      marginTop: '2rem',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    heading: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '1rem',
    },
    input: {
      border: '1px solid #ccc',
      padding: '0.5rem',
      borderRadius: '0.25rem',
    },
    button: {
      backgroundColor: '#dc2626',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      marginBottom: '1rem',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
    },
    th: {
      padding: '0.5rem',
      backgroundColor: '#f3f4f6',
      borderBottom: '1px solid #ccc',
    },
    td: {
      padding: '0.5rem',
      borderTop: '1px solid #ccc',
    },
    actions: {
      marginLeft: '0.5rem',
      cursor: 'pointer',
    },
    pagination: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
    },
    pageButton: (active) => ({
      padding: '0.25rem 0.75rem',
      borderRadius: '0.25rem',
      backgroundColor: active ? '#2563eb' : '#e5e7eb',
      color: active ? 'white' : 'black',
      cursor: 'pointer',
      border: 'none',
    }),
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Employees</h2>

      <div style={styles.grid}>
        <input name="id" placeholder="Employee ID" style={styles.input} onChange={handleFilterChange} />
        <input name="firstName" placeholder="First Name" style={styles.input} onChange={handleFilterChange} />
        <input name="lastName" placeholder="Last Name" style={styles.input} onChange={handleFilterChange} />
        <input name="loginId" placeholder="Login ID" style={styles.input} onChange={handleFilterChange} />
        <input name="dobFrom" type="date" style={styles.input} onChange={handleFilterChange} />
        <input name="dobTo" type="date" style={styles.input} onChange={handleFilterChange} />
        <select name="department" style={styles.input} onChange={handleFilterChange}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Support">Support</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      {selectedIds.length > 0 && (
        <button style={styles.button} onClick={handleDelete}>
          Delete Selected ({selectedIds.length})
        </button>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Select</th>
            <th style={styles.th}>Emp ID</th>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Login ID</th>
            <th style={styles.th}>DOB</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Salary</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((emp) => (
            <tr key={emp.id}>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(emp.id)}
                  onChange={() => handleCheckboxChange(emp.id)}
                />
              </td>
              <td style={{ ...styles.td, color: '#3b82f6', cursor: 'pointer' }}>{emp.id}</td>
              <td style={styles.td}>{emp.firstName}</td>
              <td style={styles.td}>{emp.lastName}</td>
              <td style={styles.td}>{emp.loginId}</td>
              <td style={styles.td}>{emp.dob}</td>
              <td style={styles.td}>{emp.department}</td>
              <td style={styles.td}>{emp.salary}</td>
              <td style={styles.td}>
                <span style={{ ...styles.actions, color: '#2563eb' }}>View</span>
                <span style={{ ...styles.actions, color: '#d97706' }}>Edit</span>
                <span style={{ ...styles.actions, color: '#dc2626' }}>Delete</span>
                <span style={{ ...styles.actions, color: '#6b7280' }}>History</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={styles.pageButton(currentPage === i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmployeeSearch;
