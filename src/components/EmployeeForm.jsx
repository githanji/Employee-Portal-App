import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: 700,
    margin: '30px auto',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  },
  inputFullWidth: {
    gridColumn: 'span 2',
  },
  button: {
    gridColumn: 'span 2',
    padding: '14px 0',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#2563eb', // blue-600
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1d4ed8', // blue-700
  },
};

function EmployeeForm({ employees, setEmployees }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    dob: '',
    department: '',
    salary: '',
    permanentAddress: '',
    currentAddress: '',
    idProof: null,
  });

  const [error, setError] = useState('');
  const [btnHover, setBtnHover] = useState(false);

  const departments = ['Engineering', 'Support', 'HR', 'Finance'];

  const generateEmployeeId = () => `EMP${String(employees.length + 1).padStart(3, '0')}`;

  const generateLoginId = (first, last) => {
    let base = `${first[0]}${last}`.toLowerCase();
    let loginId = base;
    let attempts = 0;
    const isLoginIdTaken = (id) => employees.some((e) => e.loginId === id);
    while (isLoginIdTaken(loginId) && attempts < 10) {
      loginId = base + Math.floor(100 + Math.random() * 900);
      attempts++;
    }
    return loginId;
  };

  const isValidDOB = (dateStr) => {
    const dob = new Date(dateStr);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();
    if (age > 18) return true;
    if (age === 18) {
      if (now.getMonth() > dob.getMonth()) return true;
      if (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate())
        return true;
    }
    return false;
  };

  const isValidFile = (file) => {
    return (
      file &&
      file.type === 'application/pdf' &&
      file.size >= 10240 &&
      file.size <= 1048576
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { firstName, lastName, dob, department, salary, idProof } = form;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !dob ||
      !department ||
      !salary ||
      !isValidDOB(dob) ||
      !isValidFile(idProof)
    ) {
      setError(
        'Please fill all fields correctly. DOB must be 18+, ID proof must be a PDF between 10KB-1MB.'
      );
      return;
    }

    const newEmployee = {
      id: generateEmployeeId(),
      loginId: generateLoginId(firstName.trim(), lastName.trim()),
      ...form,
    };

    setEmployees([...employees, newEmployee]);
    setForm({
      firstName: '',
      lastName: '',
      middleName: '',
      dob: '',
      department: '',
      salary: '',
      permanentAddress: '',
      currentAddress: '',
      idProof: null,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Employee</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          style={styles.input}
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          style={styles.input}
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          style={styles.input}
          value={form.middleName}
          onChange={(e) => setForm({ ...form, middleName: e.target.value })}
        />
        <input
          type="date"
          style={styles.input}
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          required
        />
        <select
          style={styles.input}
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Salary"
          style={styles.input}
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Permanent Address"
          style={{ ...styles.input, ...styles.inputFullWidth }}
          value={form.permanentAddress}
          onChange={(e) => setForm({ ...form, permanentAddress: e.target.value })}
        />
        <input
          type="text"
          placeholder="Current Address"
          style={{ ...styles.input, ...styles.inputFullWidth }}
          value={form.currentAddress}
          onChange={(e) => setForm({ ...form, currentAddress: e.target.value })}
        />
        <input
          type="file"
          accept="application/pdf"
          style={{ ...styles.input, ...styles.inputFullWidth, padding: '8px' }}
          onChange={(e) => setForm({ ...form, idProof: e.target.files[0] })}
          required
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(btnHover ? { backgroundColor: '#1d4ed8' } : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
