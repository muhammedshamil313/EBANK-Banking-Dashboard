
import React, { useState } from "react";

import Sidebar from "./components/sidebar";
import Header from "./components/header";
import ProductCard from "./components/productcard";
import ProductDetails from "./components/productdetails";
import ApplyForm from "./components/applyform";

import products from "./data/products";

import "./App.css";

function App() {

  // 1. Navigation state
  const [activePage, setActivePage] = useState("Dashboard");

  // 2. Product category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 3. Search state
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Product modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [applicationProduct, setApplicationProduct] = useState(null);

  // 5. Success message
  const [successMessage, setSuccessMessage] = useState("");

  // 6. Notification panel state
  const [showNotifications, setShowNotifications] = useState(false);

  // 7. Notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to EBANK Banking",
      message: "Your banking dashboard is ready.",
      time: "Just now",
      read: false
    },
    {
      id: 2,
      title: "Application updates",
      message: "You can track your application status here.",
      time: "Today",
      read: false
    }
  ]);

  // 8. Product categories
  const categories = [
    "All",
    "Savings",
    "Credit Card",
    "Loan",
    "Investment"
  ];

  // 9. Mark notification as read
  function markNotificationRead(id) {

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );

  }

  // 10. Clear all notifications
  function clearNotifications() {
    setNotifications([]);
  }

  // 11. Filter products by category and search
  const filteredProducts = products.filter((product) => {

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchText = searchQuery.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;

  });

  // 12. Dashboard page
  const renderDashboard = () => {

    return (

      <section className="dashboard-content">

        <div className="welcome-card">

          <h2>Welcome to EBANK Banking</h2>

          <p>
            Manage your banking products easily from one place.
          </p>

        </div>

        <div className="dashboard-stats">

          <div className="stat-card">
            <span>Total Products</span>
            <h2>{products.length}</h2>
          </div>

          <div className="stat-card">
            <span>Product Categories</span>
            <h2>{categories.length - 1}</h2>
          </div>

          <div className="stat-card">
            <span>Platform</span>
            <h2>Active</h2>
          </div>

        </div>

        <div className="dashboard-shortcut">

          <h2>Quick Access</h2>

          <p>
            Explore our banking products and find the right
            financial solution for your needs.
          </p>

          <button
            className="apply-btn"
            onClick={() => setActivePage("Products")}
          >
            Explore Products →
          </button>

        </div>

      </section>

    );

  };

  // 13. Products page
  const renderProducts = () => {

    return (

      <section className="dashboard-content">

        <div className="section-heading">

          <div>
            <h2>Banking Products</h2>

            <p>
              Manage all your financial products in one place.
            </p>
          </div>

          <span className="product-count">
            {filteredProducts.length} Products
          </span>

        </div>

        {/* Category filters */}
        <div className="category-filters">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "filter-btn active-filter"
                  : "filter-btn"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Product cards */}
        <div className="products-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />

            ))

          ) : (

            <div className="no-products">
              <h3>No products found</h3>
              <p>Try another search or category.</p>
            </div>

          )}

        </div>

      </section>

    );

  };

  // 14. Placeholder pages
  const renderPlaceholder = (title, description) => {

    return (

      <section className="page-notice">

        <h2>{title}</h2>

        <p>{description}</p>

      </section>

    );

  };

  return (

    <div className="app-container">

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setSelectedCategory("All");
          setSuccessMessage("");
          setShowNotifications(false);
        }}
      />

      {/* Main content */}
      <main className="main-content">

        {/* Header with Search and Notifications */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}

          showNotifications={showNotifications}

          onToggleNotifications={() =>
            setShowNotifications((previous) => !previous)
          }

          notifications={notifications}

          onMarkRead={markNotificationRead}

          onClearNotifications={clearNotifications}
        />

        {/* Success message */}
        {successMessage && (

          <div className="success-message">

            <span>{successMessage}</span>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
            >
              ×
            </button>

          </div>

        )}

        {/* Page rendering */}
        {activePage === "Dashboard" && renderDashboard()}

        {activePage === "Products" && renderProducts()}

        {activePage === "Transactions" &&
          renderPlaceholder(
            "Transactions",
            "Transaction management coming soon."
          )
        }

        {activePage === "Accounts" &&
          renderPlaceholder(
            "Accounts",
            "Account management coming soon."
          )
        }

        {activePage === "Settings" &&
          renderPlaceholder(
            "Settings",
            "Account settings coming soon."
          )
        }

      </main>

      {/* Product Details Modal */}
      {selectedProduct && (

        <ProductDetails
          product={selectedProduct}

          onClose={() => setSelectedProduct(null)}

          onApply={(product) => {
            setSuccessMessage("");
            setApplicationProduct(product);
            setSelectedProduct(null);
          }}
        />

      )}

      {/* Application Form Modal */}
      {applicationProduct && (

        <ApplyForm
          product={applicationProduct}

          onClose={() => {
            setApplicationProduct(null);
          }}

          onSuccess={() => {
            setApplicationProduct(null);

            setSuccessMessage(
              "Your application has been submitted successfully!"
            );
          }}
        />

      )}

    </div>

  );

}

export default App;
