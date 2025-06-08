import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (!storedData) {
      navigate("/");
      return;
    }
    setFormData(JSON.parse(storedData));
  }, [navigate]);

  if (!formData) return null;

  return (
    <div className="success-container">
      <h2>Registration Successful!</h2>
      <div className="data-display">
        <h3>Submitted Information:</h3>
        <div className="data-grid">
          <div className="data-item">
            <span className="label">Name:</span>
            <span className="value">{`${formData.firstName} ${formData.lastName}`}</span>
          </div>
          <div className="data-item">
            <span className="label">Username:</span>
            <span className="value">{formData.username}</span>
          </div>
          <div className="data-item">
            <span className="label">Email:</span>
            <span className="value">{formData.email}</span>
          </div>
          <div className="data-item">
            <span className="label">Phone:</span>
            <span className="value">{`${formData.phoneCode} ${formData.phoneNumber}`}</span>
          </div>
          <div className="data-item">
            <span className="label">Location:</span>
            <span className="value">{`${formData.city}, ${formData.country}`}</span>
          </div>
          <div className="data-item">
            <span className="label">PAN Number:</span>
            <span className="value">{formData.panNumber}</span>
          </div>
          <div className="data-item">
            <span className="label">Aadhar Number:</span>
            <span className="value">{formData.aadharNumber}</span>
          </div>
        </div>
      </div>
      <button onClick={() => navigate("/")} className="back-button">
        Back to Form
      </button>
    </div>
  );
};

export default SuccessPage;
