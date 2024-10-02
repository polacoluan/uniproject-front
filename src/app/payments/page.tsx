import React from 'react';
import PaymentsTable from '../../components/payment/payments-table';

const PaymentsPage = () => (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4 text-center">Lista de Pagamentos</h1>
    <PaymentsTable />
  </div>
);

export default PaymentsPage;