import React from 'react';
import InstallmentsTable from '../../components/installment/installment-table';

const InstallmentPage = () => (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4 text-center">Lista de Parcelas</h1>
    <InstallmentsTable />
  </div>
);

export default InstallmentPage;