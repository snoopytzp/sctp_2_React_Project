// app/crm/customers/page.js
import styles from './page.module.css';
import CustomerSearch from './CustomerSearch';
import Link from 'next/link';

export const metadata = {
  title: 'Customers · Simple CRM',
};

export default async function CustomersPage() {
  const res = await fetch(`${process.env.API_BASE_URL}/customers`);
  const customers = await res.json();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Customers</h1>
        <Link href="/crm/customers/new" className={styles.btnPrimaryLink}>Add Customer</Link>
</div>
      <CustomerSearch customers={customers} />
    </div>
  );
}