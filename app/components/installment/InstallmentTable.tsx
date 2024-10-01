"use client";

import React, { useEffect, useState } from 'react';
import { Installment } from '../../types/installment';
import CustomModal from '../modal/Modal';
import InstallmentForm from './InstallmentForm';
import api from '../../services/api';

const InstallmentsTable = () => {
    const [installments, setInstallments] = useState<Installment[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentInstallment, setCurrentInstallment] = useState<Installment | null>(null);

    const listInstallments = async () => {
        try {
            const response = await api.get('/installment/');
            setInstallments(response.data.data);
        } catch (error) {
            console.error('Erro ao Buscar Parcelas:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete('/payment/'+id);
            await listInstallments();
        } catch (error) {
            console.error('Erro ao Remover Parcela:', error);
        }
    };

    const openEditModal = (installment: Installment) => {
        setCurrentInstallment(installment);
        setEditModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentInstallment(null);
        setAddModalOpen(true);
    };

    const closeModal = () => {
        setEditModalOpen(false);
        setAddModalOpen(false);
    };

    const handleFormSubmit = () => {
        listInstallments();
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    useEffect(() => {
        listInstallments();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <table className="min-w-full bg-white">
                <thead className='bg-slate-100'>
                    <tr>
                        <th className="px-6 py-3 border-b-2">Estudante</th>
                        <th className="px-6 py-3 border-b-2">Parcela</th>
                        <th className="px-6 py-3 border-b-2">Valor</th>
                        <th className="px-6 py-3 border-b-2">Data de Pagamento</th>
                        <th className="px-6 py-3 border-b-2">Ações</th>
                        </tr>
                </thead>
                <tbody>
                    {installments.map((installment) => (
                        <tr key={installment.id} className='odd:bg-white even:bg-slate-100 text-center text-slate-600'>
                            <td className="px-6 py-4 border-b">{installment.student_name}</td>
                            <td className="px-6 py-4 border-b">{installment.installment}</td>
                            <td className="px-6 py-4 border-b">R$ {installment.amount.replace('.', ',')}</td>
                            <td className="px-6 py-4 border-b">{installment.payment_date ?? 'Não Pago'}</td>
                            <td className="px-6 py-4 border-b">
                                <button
                                    onClick={() => openEditModal(installment)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(installment.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Modal */}
            <CustomModal isOpen={isAddModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Adicionar Parcela</h2>
                <InstallmentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Editar Parcela</h2>
                {currentInstallment && <InstallmentForm installment={currentInstallment} onSuccess={handleFormSubmit} />}
            </CustomModal>
        </div>
    );
};

export default InstallmentsTable;
