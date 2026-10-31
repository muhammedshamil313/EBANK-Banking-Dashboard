
import React from "react";

function ProductCard({ product, onViewDetails, onApply }) {

  return (

    <div className="product-card">

      {/* Product Header */}
      <div className="product-card-header">

        <div>
          <h3>{product.name}</h3>
          <span className="product-category">
            {product.category}
          </span>
        </div>

        <span
          className={`product-status ${
            product.status === "Active"
              ? "status-active"
              : "status-pending"
          }`}
        >
          {product.status}
        </span>

      </div>

      {/* Product Description */}
      <p className="product-description">
        {product.description}
      </p>

      {/* Product Metrics */}
      <div className="product-metrics">

        {product.balance && (
          <div className="metric">
            <span>Account Balance</span>
            <strong>{product.balance}</strong>
          </div>
        )}

        {product.availableLimit && (
          <div className="metric">
            <span>Available Limit</span>
            <strong>{product.availableLimit}</strong>
          </div>
        )}

        {product.loanAmount && (
          <div className="metric">
            <span>Loan Amount</span>
            <strong>{product.loanAmount}</strong>
          </div>
        )}

        {product.investmentAmount && (
          <div className="metric">
            <span>Investment</span>
            <strong>{product.investmentAmount}</strong>
          </div>
        )}

        {product.interestRate && (
          <div className="metric">
            <span>Interest Rate / Return</span>
            <strong>{product.interestRate}</strong>
          </div>
        )}

      </div>

      {/* Action Button */}
      <button
        className="view-details-btn"
        onClick={() => onViewDetails(product)}
      >
        View Details →
      </button>

    </div>

  );
}

export default ProductCard;
