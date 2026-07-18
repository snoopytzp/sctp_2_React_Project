// src/App.jsx
import { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";

// ─── Auth Panel (messy: reads context directly, no encapsulation) ──────────────
function AuthPanel() {
  const { currentUser, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = login(username, password);
    if (!ok) setError("Invalid username or password.");
    else setError("");
  };

  if (currentUser) {
    return (
      <div className="panel auth-panel">
        <h2>Auth</h2>
        <p>
          Logged in as <strong>{currentUser.name}</strong>
        </p>
        <p>
          Role: <strong>{currentUser.role}</strong>
        </p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }

  return (
    <div className="panel auth-panel">
      <h2>Auth</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="status">Try: admin / password</p>
    </div>
  );
}

// ─── Search Panel (messy: no debouncing, re-filters on every keystroke) ────────
const CONTACTS = [
  "Alice Tan",
  "Bob Lim",
  "Carol Wong",
  "David Chen",
  "Eve Ng",
  "Frank Ho",
  "Grace Koh",
  "Hassan Ibrahim",
  "Ivan Teo",
  "Keith Tan",
  "Karen Yeo",
  "Leon Goh",
  "Mei Lin Foo",
  "Nathan Seah",
  "Olivia Png",
  "Priya Nair",
  "Quentin Tan",
  "Rachel Sim",
  "Jeff Wee",
  "Tricia Lau",
];

function SearchPanel() {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () =>
      CONTACTS.filter((name) =>
        name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="panel">
      <h2>Search</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search contacts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul className="result-list">
        {results.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <p className="status">
        {results.length} result{results.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ─── Data Panel (messy: fetch logic inline) ─────────────────────────────────────
function DataPanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/contacts");
        const json = await response.json();
        if (!ignore) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    loadContacts();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading)
    return (
      <div className="panel">
        <h2>Data</h2>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="panel">
        <h2>Data</h2>
        <p className="error">Error: {error}</p>
      </div>
    );

  return (
    <div className="panel">
      <h2>Data</h2>
      <ul className="result-list">
        {data.map((contact) => (
          <li key={contact.id}>
            {contact.name} — {contact.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
function AppContent() {
  return (
    <div className="app">
      <h1>hooks-demo</h1>
      <div className="panels">
        <AuthPanel />
        <SearchPanel />
        <DataPanel />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}