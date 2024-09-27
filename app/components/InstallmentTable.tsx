// app/components/InstallmentsTable.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { Installment } from '../types/installment';
import CustomModal from './Modal';
import InstallmentForm from './InstallmentForm';
import { fetchInstallments, deleteInstallment } from '../services/api_installments';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableData } from '@shadcn/ui';

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
            <Table className="min-w-full bg-white">
                <TableHeader>
                    <TableRow>
                        <TableCell>Estudante</TableCell>
                        <TableCell>Parcela</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Data de Pagamento</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {installments.map((installment) => (
                        <TableRow key={installment.id}>
                            <TableData>{installment.student_name}</TableData>
                            <TableData>{installment.installment}</TableData>
                            <TableData>{installment.amount}</TableData>
                            <TableData>{installment.payment_date ?? 'Não Pago'}</TableData>
                            <TableData>
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
                            </TableData>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
