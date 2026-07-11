import { useState, useEffect } from "react";

//import { mockCustomers, generateCustomerId } from "./mockData";
import CustomerCard from "./components/CustomerCard";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CustomerDetail from "./components/CustomerDetail";
import Spinner from "./components/Spinner";

export  const API_BASE = "http://localhost:3001";

function App() {
  //const [customers, setCustomers] = useState(mockCustomers);
  const [customers, setCustomers] = useState([]); // Create an empty array for customers initially, will be populated by the API call

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

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newCustomer = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: "",
      status: form.status,
      tags: form.tags,
      company: "",
      notes: "",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(`${API_BASE}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error(`Failed to add customer: ${response.status}`);
      }

      const created = await response.json();
      setCustomers([...customers, created]);
      setForm({ firstName: "", lastName: "", email: "", tags: [], status: "active" });
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
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

  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`${API_BASE}/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete customer: ${response.status}`);
      }

      // Update the customers state to remove the deleted customer
      setCustomers(customers.filter((c) => c.id !== customerId));
      if (selectedId === customerId) {
        setSelectedId(null);
      }
      //Alternatively, you could also refetch the customers from the API after deletion, but this is more efficient.,
      // e.g. loadCustomers();

    } catch (err) {
      alert(err.message);
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

  // const loadCustomers = async () => {
  //   const response = await fetch(`${API_BASE}/customers`);
  //   const data = await response.json();
  //   setCustomers(data);
  // };

  const ALL_TAGS = ["VIP", "Lead", "Referral"];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
      const loadCustomers = async () => {
        setLoading(true);
        try {
          //fake delay to simulate network latency
          await new Promise((resolve) => setTimeout(resolve, 2000))

          const response = await fetch(`${API_BASE}/customers`);

          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }

          const data = await response.json();
          setCustomers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    loadCustomers();
  }, [selectedId]);

  if (loading) return <Spinner />;
  if (error)   return <p className="status-message error">Error: {error}</p>;

  const handleUpdateCustomer = async (customerId, updates) => {
    try {
      const response = await fetch(`${API_BASE}/customers/${customerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update customer: ${response.status}`);
      }

      const updated = await response.json();
      setCustomers((prev) =>
        prev.map((c) => (c.id === customerId ? updated : c))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="simple-crm">
      <h1>Simple CRM (2.5)</h1>

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

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Adding..." : "Add Customer"}
        </button>
      </form>)
      }

      <div className="crm-layout">
        <div className="customer-panel">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

          {/* <button className="toggle-form-btn" onClick={loadCustomers}>
            Load Customers
          </button> */}

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
                    onSelect={setSelectedId}
                    isSelected={selectedId === customer.id}
                  />
                ))}
              </div>
            )}
          </div>
      </div>

      <CustomerDetail selectedId={selectedId} onUpdate={handleUpdateCustomer} />
      </div>

    </div>
  );
}

export default App;
