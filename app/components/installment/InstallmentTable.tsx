// app/components/InstallmentsTable.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { Installment } from '../../types/installment';
import CustomModal from '../modal/Modal';
import InstallmentForm from './InstallmentForm';
import { fetchInstallments, deleteInstallment } from '../../services/api_installments';

const InstallmentsTable = () => {
    const [installments, setInstallments] = useState<Installment[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentInstallment, setCurrentInstallment] = useState<Installment | null>(null);

    // List installments
    const listInstallments = async () => {
        try {
            const response = await fetchInstallments();
            setInstallments(response);
        } catch (error) {
            console.error('Erro ao Buscar Parcelas:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        try {
            await deleteInstallment(id);
            await listInstallments(); // Refresh the installment list after deletion
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

    // Handle form submission success
    const handleFormSubmit = () => {
        listInstallments(); // Refresh the installment list after adding or updating
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    // Fetch installments on component mount
    useEffect(() => {
        listInstallments();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            {/* <button
                onClick={openAddModal}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Adicionar Parcela
            </button> */}
            <table className="min-w-full bg-white">
                <thead>
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
                        <tr key={installment.id}>
                            <td className="px-6 py-4 border-b">{installment.student_name}</td>
                            <td className="px-6 py-4 border-b">{installment.installment}</td>
                            <td className="px-6 py-4 border-b">{installment.amount}</td>
                            <td className="px-6 py-4 border-b">{installment.payment_date ?? 'Não Pago'}</td>
                            <td className="px-6 py-4 border-b">
                                <button
                                    onClick={() => openEditModal(installment)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(installment.id)}
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
                <h2 className="text-xl font-bold mb-4">Adicionar Parcela</h2>
                <InstallmentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">Editar Parcela</h2>
                {currentInstallment && <InstallmentForm installment={currentInstallment} onSuccess={handleFormSubmit} />}
            </CustomModal>
        </div>
    );
};

export default InstallmentsTable;
