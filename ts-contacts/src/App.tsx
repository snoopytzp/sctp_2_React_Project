// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import type { Contact } from "./types/Contact";
import { SearchBar } from "./components/SearchBar";
import { ContactList } from "./components/ContactList";

const initialContacts: Contact[] = [
  { id: 1, name: "Alice Tan", email: "alice@example.com" },
  { id: 2, name: "Bob Lim", email: "bob@example.com" },
  { id: 3, name: "Carol Wong", email: "carol@example.com" },
  { id: 4, name: "David Chen", email: "david@example.com" },
];

const appTitle: string = "ts-contacts";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/contacts');

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (err) {
        //setError(err.message);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const addContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleAdd = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    addContact({ id: Date.now(), name: newName, email: newEmail });
    setNewName("");
    setNewEmail("");
  };

  return (
    <div className="app">
      <h1>appTitle</h1>
      <SearchBar query={query} onQueryChange={setQuery} />
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
      <ContactList contacts={filtered} title="Contacts" />
    </div>
  );
}