import { useState } from "react";

import { mockCustomers, generateCustomerId } from "./mockData";
import CustomerCard from "./components/CustomerCard";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CustomerDetail from "./components/CustomerDetail";

function App() {
  const [customers, setCustomers] = useState(mockCustomers);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");

  // Use an object to manage form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tags: [],
  });

  const handleChange = (e) => {
    // if(e.target.name === "firstName") {
    //   if(e.target.value === "a") alert("name cannot have a")
    // }

    setForm((prev) => {
      // [e.target.name] will evaluate to become "firstName", "lastName"
      const updatedCopy = { ...prev, [e.target.name]: e.target.value };
      return updatedCopy;
    });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();

    const newCustomer = {
      id: generateCustomerId(),
      // firstName: firstName,
      // firstName,
      // lastName,
      // email,
      // Using form object state
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: "",
      status: "active",
      tags: form.tags,       // was tags: []
      company: "",
      notes: "",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    // Add new customer to the customers list
    setCustomers([...customers, newCustomer]);

    // Clear the form
    // setFirstName("");
    // setLastName("");
    // setEmail("");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      tags: []
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Derived: computed on every render, always in sync
  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Derived state: count of active customers based on the filtered list
  const activeCount = filteredCustomers.filter((c) => c.status === "active").length;

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter((c) => c.id !== customerId));
    if (selectedCustomer?.id === customerId) {
      setSelectedCustomer(null);
    }
  };

  const [showForm, setShowForm] = useState(false); 

  // Why setForm((prev) => ...) instead of setForm({ ...form, ... })? 
  // When the new state depends on the previous state, always use the function form. 
  // It guarantees React hands you the latest state value, which matters if multiple updates happen 
  // in quick succession.
  const handleTagToggle = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const ALL_TAGS = ["VIP", "Lead", "Referral"];

  return (
    <div className="simple-crm">
      <h1>Simple CRM (2.3)</h1>

      <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
        {showForm ? "Cancel" :  "Add Customer"}
      </button>

      {showForm && (
      <form onSubmit={handleAddCustomer} className="add-customer-form">
        <h3>Add New Customer</h3>

        <div className="form-field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="e.g. Sarah"
            // value={firstName}
            value={form.firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-field">
          <label>Tags</label>
          <div className="tag-options">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`tag-toggle${form.tags.includes(tag) ? " tag-toggle-active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="e.g. Chen"
            // value={lastName}
            value={form.lastName}
            // onChange={(e) => setLastName(e.target.value)}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. sarah.chen@email.com"
            // value={email}
            value={form.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Customer
        </button>
      </form>)
      }

      <div className="crm-layout">
        <div className="customer-panel">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

          <div className="customer-list">
            <h2>Customers ({filteredCustomers.length}/{customers.length}) - {activeCount} current active customers</h2>

            {filteredCustomers.length === 0 ? (
              <p className="empty-state">
                {searchTerm
                  ? "No customers match your search."
                  : "No customers yet. Add one above!"}
              </p>
            ) : (
              <div className="customers">
                {filteredCustomers.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onDelete={handleDeleteCustomer}
                    onSelect={setSelectedCustomer}
                    isSelected={selectedCustomer?.id === customer.id}
                  />
                ))}
              </div>
            )}
          </div>
      </div>

      <CustomerDetail customer={selectedCustomer} />
      </div>

    </div>
  );
}

export default App;
