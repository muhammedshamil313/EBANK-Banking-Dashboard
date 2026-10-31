
import React, { useState } from "react";

function ApplyForm({ product, onClose, onSuccess }) {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    agreed: false
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  // Validate form
  function handleSubmit(e) {

    e.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (
      product.category === "Loan" &&
      (!formData.amount || Number(formData.amount) <= 0)
    ) {
      newErrors.amount = "Enter a valid requested amount";
    }

    if (!formData.agreed) {
      newErrors.agreed = "Please accept the terms";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      onSuccess({
        productName: product.name,
        ...formData
      });

    }
  }

  return (

    <div className="modal-overlay" onClick={onClose}>

      <div
        className="application-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <div>
            <h2>Apply for Product</h2>
            <p>{product.name}</p>
          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <span className="form-error">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="form-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="10-digit mobile number"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <span className="form-error">
                {errors.phone}
              </span>
            )}
          </div>

          {product.category === "Loan" && (
            <div className="form-group">
              <label>Requested Loan Amount (₹)</label>

              <input
                type="number"
                name="amount"
                placeholder="Enter loan amount"
                min="1"
                value={formData.amount}
                onChange={handleChange}
              />

              {errors.amount && (
                <span className="form-error">
                  {errors.amount}
                </span>
              )}
            </div>
          )}

          <label className="terms-label">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />

            I agree to the demonstration application terms.
          </label>

          {errors.agreed && (
            <span className="form-error">
              {errors.agreed}
            </span>
          )}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="apply-btn"
            >
              Submit Application
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default ApplyForm;
