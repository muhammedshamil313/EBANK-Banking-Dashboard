
import React from "react";

function ProductDetails({ product, onClose, onApply }) {

  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">
          <div>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">

          <div className="detail-row">
            <span>Product Status</span>
            <strong>{product.status}</strong>
          </div>

          <div className="detail-row">
            <span>Description</span>
            <strong>{product.description}</strong>
          </div>

          {product.balance && (
            <div className="detail-row">
              <span>Account Balance</span>
              <strong>{product.balance}</strong>
            </div>
          )}

          {product.availableLimit && (
            <div className="detail-row">
              <span>Available Limit</span>
              <strong>{product.availableLimit}</strong>
            </div>
          )}

          {product.totalLimit && (
            <div className="detail-row">
              <span>Total Credit Limit</span>
              <strong>{product.totalLimit}</strong>
            </div>
          )}

          {product.loanAmount && (
            <div className="detail-row">
              <span>Loan Amount</span>
              <strong>{product.loanAmount}</strong>
            </div>
          )}

          {product.investmentAmount && (
            <div className="detail-row">
              <span>Investment Amount</span>
              <strong>{product.investmentAmount}</strong>
            </div>
          )}

          {product.interestRate && (
            <div className="detail-row">
              <span>Interest Rate / Return</span>
              <strong>{product.interestRate}</strong>
            </div>
          )}

        </div>

       <div className="modal-actions">

            <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
            >
                Close
            </button>

            <button
                type="button"
                className="apply-btn"
                onClick={() => onApply(product)}
            >
                Apply Now
            </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
