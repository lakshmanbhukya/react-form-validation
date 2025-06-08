import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Sample data for dropdowns (you can replace with actual API data)
  const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
  ];

  const cities = {
    IN: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
    US: ["New York", "Los Angeles", "Chicago", "Houston"],
    UK: ["London", "Manchester", "Birmingham", "Liverpool"],
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = "This field is required";
        else if (!/^[A-Za-z\s]{2,}$/.test(value))
          error = "Only letters and spaces allowed";
        break;
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (!/^[A-Za-z0-9_]{3,}$/.test(value))
          error = "Username must be at least 3 characters";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8)
          error = "Password must be at least 8 characters";
        else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(value))
          error = "Password must contain uppercase, lowercase and number";
        break;
      case "phoneNumber":
        if (!value) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Phone number must be 10 digits";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "city":
        if (!value) error = "City is required";
        break;
      case "panNumber":
        if (!value) error = "PAN number is required";
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          error = "Invalid PAN format";
        break;
      case "aadharNumber":
        if (!value) error = "Aadhar number is required";
        else if (!/^\d{12}$/.test(value))
          error = "Aadhar number must be 12 digits";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isAllFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    setIsFormValid(!hasErrors && isAllFieldsFilled);
  }, [errors, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Store form data in localStorage for the success page
      localStorage.setItem("formData", JSON.stringify(formData));
      navigate("/success");
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <div className="phone-input">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={errors.phoneNumber ? "error" : ""}
            />
          </div>
          {errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? "error" : ""}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="error-message">{errors.country}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error" : ""}
            disabled={!formData.country}
          >
            <option value="">Select City</option>
            {formData.country &&
              cities[formData.country]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="panNumber">PAN Number *</label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className={errors.panNumber ? "error" : ""}
            placeholder="ABCDE1234F"
          />
          {errors.panNumber && (
            <span className="error-message">{errors.panNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number *</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className={errors.aadharNumber ? "error" : ""}
            placeholder="123456789012"
          />
          {errors.aadharNumber && (
            <span className="error-message">{errors.aadharNumber}</span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
