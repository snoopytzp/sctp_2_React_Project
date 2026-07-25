import { useEffect, useState } from "react";

import { useAuth } from "./contexts/AuthContext.tsx";
import type { Contact } from "./types/Contact";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";

import "./App.css";

// Loading data from API instead
// const initialContacts: Contact[] = [
//   { id: 1, name: "Alice Tan", email: "alice@example.com" },
//   { id: 2, name: "Bob Lim", email: "bob@example.com" },
//   { id: 3, name: "Carol Wong", email: "carol@example.com" },
//   { id: 4, name: "David Chen", email: "david@example.com" },
// ];

// const appTitle: string = 42;
// const appTitle: string = "ts-contacts";
const appTitle = "ts-contacts";

export default function App() {
  const { user, login, logout } = useAuth();

  // const [contacts, setContacts] = useState(initialContacts);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await fetch("http://localhost:3001/contacts");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        // const data = await response.json();
        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (err) {
        // setError(err.message);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const addContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  // Example of calling `addContact` with an invalid contact object (extra property `age`), which will cause a TypeScript error
  // const test = () => {
  //   addContact({ id: 4, name: "David Chen", email: "david@example.com", age: 30 });
  // }

  // Example of a function that returns a `Contact` type
  // const getContact = (id: number): Contact => {
  //   return contacts.find((c) => c.id === id)!;
  // }

  const handleAdd = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    // setContacts could be called directly here
    // But we want to demonstrate annotating the function parameter with the `Contact` type
    // setContacts((prev) => [...prev, newContact]);
    addContact({ id: Date.now(), name: newName, email: newEmail });
    setNewName("");
    setNewEmail("");
  };

  const removeContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div className="app">
      <h1>{appTitle}</h1>
      <div className="auth-buttons">
        {user ? (
          <button onClick={logout}>Log out ({user.name})</button>
        ) : (
          <button onClick={() => login("Alice Tan")}>Log in</button>
        )}
      </div>
      <SearchBar query={query} onQueryChange={setQuery} />
      {/* <form onSubmit={(e)=>{}} className="add-contact-form"> */}
      <form onSubmit={handleAdd} className="add-contact-form">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Add</button>
      </form>
      <ContactList
        title="Contacts"
        contacts={filtered}
        onRemove={removeContact}
      />
    </div>
  );
}
