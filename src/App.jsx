
import { useState } from 'react';
import './App.css';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  const [errors, setErrors] = useState({});
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });

    setMessage('');
    setStudent(null);
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (!/^[a-zA-Z ]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should contain only letters and spaces.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain exactly 10 digits.';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course.';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setMessage('');
    setStudent(null);

    if (Object.keys(validationErrors).length === 0) {
      setStudent({ ...formData });
      setMessage('Registration successful! Your details have been submitted.');
    }
  }

  function handleReset() {
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: ''
    });

    setErrors({});
    setStudent(null);
    setMessage('');
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Student Registration</h1>
        <p>Register for your preferred course in a few simple steps.</p>
      </header>

      <main className="container">
        <section className="form-card">
          <h2>Registration Form</h2>
          <p className="subtitle">Please fill in all the details.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="error">{errors.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="error">{errors.phone}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="course">Select Course</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                aria-invalid={!!errors.course}
              >
                <option value="">-- Choose a course --</option>
                <option value="Web Development">Web Development</option>
                <option value="Python Programming">Python Programming</option>
                <option value="Data Science">Data Science</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
              </select>
              {errors.course && (
                <p className="error">{errors.course}</p>
              )}
            </div>

            <div className="buttons">
              <button type="submit" className="submit-btn">
                Register Now
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>

          {message && (
            <div
              className="success-message"
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}
        </section>

        {student && (
          <section className="result-card">
            <h2>Registration Details</h2>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Course:</strong> {student.course}</p>
          </section>
        )}
      </main>

      <footer>
        <p>Student Registration System | ReactJS Mini Project</p>
      </footer>
    </div>
  );
}

export default function App() {
  return <StudentForm />;
}