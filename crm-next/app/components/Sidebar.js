// app/components/Sidebar.js
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className={styles.logoText}>Simple CRM</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLabel}>Workspace</div>
        <Link href="/crm" className={styles.navItem}>
          <LayoutDashboard size={17} />
          <span>Dashboard</span>
        </Link>
        <Link href="/crm/customers" className={styles.navItem}>
          <Users size={17} />
          <span>Customers</span>
        </Link>
      </nav>

      <div className={styles.foot}>
        <button className={styles.signOutBtn} title="Sign out">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}