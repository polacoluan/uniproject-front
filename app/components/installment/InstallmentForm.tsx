// app/components/InstallmentForm.tsx
"use client"; // Ensure this is present

import React, { useState, useEffect } from 'react';
import { createInstallment, updateInstallment } from '../../services/api_installments';
import { Installment } from '../../types/installment';

interface InstallmentFormProps {
  installment?: Installment; // Accept a Installment object
  onSuccess: () => void;
}

const InstallmentForm: React.FC<InstallmentFormProps> = ({ installment, onSuccess }) => {
  const [formData, setFormData] = useState<Installment>({
    id: 0,
    installment: 0,
    amount: '0',
    payment_date: '',
    student_name: ''
  });

  useEffect(() => {
    if (installment) {
      setFormData(installment);
    } else {
      setFormData({
        id: 0,
        installment: 0,
        amount: '0',
        payment_date: '',
        student_name: ''
      });
    }
  }, [installment]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (installment) {
        await updateInstallment(installment.id, formData);
      } else {
        await createInstallment(formData);
      }
      onSuccess(); // Notify parent component
    } catch (error) {
      console.error('Falha ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="installment" className="block mb-2">Insira o número da parcela:</label>
      <input
        id="installment"
        type="text"
        name="installment"
        placeholder="Nome"
        value={formData.installment || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="amount" className="block mb-2">Insira o valor da parcela:</label>
      <input
        id="amount"
        type="text"
        name="amount"
        placeholder="Valor"
        value={formData.amount || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="payment_date" className="block mb-2">Insira a data e hora do pagamento da parcela:</label>
      <input
        id="payment_date"
        type="datetime-local"
        name="payment_date"
        value={formData.payment_date || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />
      {/* Add other form fields similarly */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {installment ? 'Atualizar Parcela' : 'Adicionar Parcela'}
      </button>
    </form>
  );
};

export default InstallmentForm;
