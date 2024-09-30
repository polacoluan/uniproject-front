"use client";

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Installment } from '../../types/installment';

interface InstallmentFormProps {
  installment?: Installment;
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
        await api.patch('/installment/'+installment.id, formData);
      } else {
        await api.post('/installment/',formData);
      }
      onSuccess(); // Notify parent component
    } catch (error) {
      console.error('Falha ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="installment" className="block mb-2">Número da parcela:</label>
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

      <label htmlFor="amount" className="block mb-2">Valor da parcela:</label>
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

      <label htmlFor="payment_date" className="block mb-2">Data do Pagamento:</label>
      <input
        id="payment_date"
        type="datetime-local"
        name="payment_date"
        value={formData.payment_date || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        <i className="fa-solid fa-floppy-disk"></i> Salvar
      </button>
    </form>
  );
};

export default InstallmentForm;
