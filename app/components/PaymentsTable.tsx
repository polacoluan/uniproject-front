// app/components/PaymentsTable.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { Payment, Installment } from '../types/payment';
import CustomModal from './Modal';
import PaymentForm from './PaymentForm';
import { fetchPayments, deletePayment } from '../services/api_payment';

const PaymentsTable = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);

    // List payments
    const listpayments = async () => {
        try {
            const response = await fetchPayments();
            setPayments(response);
        } catch (error) {
            console.error('Erro ao Buscar Pagamento:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        try {
            await deletePayment(id);
            await listpayments(); // Refresh the payment list after deletion
        } catch (error) {
            console.error('Erro ao Remover Pagamento:', error);
        }
    };

    const openEditModal = (payment: Payment) => {
        setCurrentPayment(payment);
        setEditModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentPayment(null);
        setAddModalOpen(true);
    };

    const closeModal = () => {
        setEditModalOpen(false);
        setAddModalOpen(false);
    };

    // Handle form submission success
    const handleFormSubmit = () => {
        listpayments(); // Refresh the payment list after adding or updating
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    // Fetch payments on component mount
    useEffect(() => {
        listpayments();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <button
                onClick={openAddModal}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Adicionar Pagamento
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2">Nome do Estudante</th>
                        <th className="px-6 py-3 border-b-2">Forma de Pagamento</th>
                        <th className="px-6 py-3 border-b-2">Quantidade de Parcelas</th>
                        <th className="px-6 py-3 border-b-2">Valor</th>
                        <th className="px-6 py-3 border-b-2">Valor Pago</th>
                        <th className="px-6 py-3 border-b-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td className="px-6 py-4 border-b">{payment.studentName}</td>
                            <td className="px-6 py-4 border-b">{payment.type}</td>
                            <td className="px-6 py-4 border-b">{payment.type}</td>
                            <td className="px-6 py-4 border-b">{payment.amount}</td>
                            <td className="px-6 py-4 border-b">{payment.amountPaid}</td>
                            <td className="px-6 py-4 border-b">
                                <button
                                    onClick={() => openEditModal(payment)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(payment.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Modal */}
            <CustomModal isOpen={isAddModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">Adicionar Pagamento</h2>
                <PaymentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">Editar Pagamento</h2>
                {currentPayment && <PaymentForm payment={currentPayment} onSuccess={handleFormSubmit} />}
            </CustomModal>
        </div>
    );
};

export default PaymentsTable;
