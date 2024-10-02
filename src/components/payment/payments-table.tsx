"use client";

import React, { useEffect, useState } from 'react';
import { PaymentTable } from '../../types/payment-table';
import { Payment } from '../../types/payment';
import CustomModal from '../modal/modal';
import PaymentForm from './payment-form';
import api from '../../services/api';

const PaymentsTable = () => {
    const [payments, setPayments] = useState<PaymentTable[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentPayment, setCurrentPayment] = useState<PaymentTable | null>(null);

    const listpayments = async () => {
        try {
            const response = await api.get('/payment/');
            setPayments(response.data.data);
        } catch (error) {
            console.error('Erro ao Buscar Pagamento:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete('/payment/'+id);
            await listpayments();
        } catch (error) {
            console.error('Erro ao Remover Pagamento:', error);
        }
    };

    const openEditModal = (payment: PaymentTable) => {
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

    const handleFormSubmit = () => {
        listpayments();
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    const mapPaymentTableToPayment = (paymentTable: PaymentTable): Payment => {
        return {
            id: paymentTable.id,
            student_id: paymentTable.student_id,
            payment_method_id: paymentTable.payment_method_id,
            amount: parseFloat(paymentTable.amount),
        };
    };

    useEffect(() => {
        listpayments();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <button
                onClick={openAddModal}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                <i className="fa-solid fa-plus"></i> Adicionar Pagamento
            </button>
            <table className="min-w-full bg-white">
                <thead className='bg-slate-100'>
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
                    {payments.map((payment) => {

                        const totalPaid = payment.installments.data
                            .filter(installment => installment.payment_date !== null)
                            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
                            .toFixed(2);

                        return (
                            <tr key={payment.id} className='odd:bg-white even:bg-slate-100 text-center text-slate-600'>
                                <td className="px-6 py-4 border-b">{payment.student.data.name}</td>
                                <td className="px-6 py-4 border-b">{payment.paymentMethod.data.method}</td>
                                <td className="px-6 py-4 border-b">{payment.installments.data.length}</td>
                                <td className="px-6 py-4 border-b">R$ {payment.amount.replace('.', ',')}</td>
                                <td className="px-6 py-4 border-b">
                                    R$ {totalPaid.replace('.', ',')}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    <button
                                        onClick={() => openEditModal(payment)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(payment.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>

            {/* Add Modal */}
            <CustomModal isOpen={isAddModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Adicionar Pagamento</h2>
                <PaymentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Editar Pagamento</h2>
                {currentPayment && <PaymentForm payment={mapPaymentTableToPayment(currentPayment)} onSuccess={handleFormSubmit} />}
            </CustomModal>
        </div>
    );
};

export default PaymentsTable;
