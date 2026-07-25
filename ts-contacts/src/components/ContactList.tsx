import type { Contact } from "../types/Contact";

type ContactListProps = {
  title?: string;
  contacts: Contact[];
  onRemove: (id: number) => void;
};

function ContactList({ title, contacts, onRemove }: ContactListProps) {
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul className="contact-list">
        {contacts.map((c) => (
          <li key={c.id} className="contact-item">
            <strong>{c.name}</strong> · {c.email}
            <button onClick={() => onRemove(c.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ContactList;
