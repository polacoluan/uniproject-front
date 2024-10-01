"use client";

import React, { useEffect, useState } from 'react';
import { Student } from '../../types/student';
import CustomModal from '../modal/modal';
import StudentForm from '../student/student-form';
import api from '../../services/api';

const StudentsTable = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

    // List students
    const listStudents = async () => {
        try {
            const response = await api.get('/student/');
            setStudents(response.data.data);
        } catch (error) {
            console.error('Erro ao Buscar Estudantes:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        try {
            await api.delete('/student/'+ id);
            await listStudents();
        } catch (error) {
            console.error('Erro ao Remover Estudante:', error);
        }
    };

    const openEditModal = (student: Student) => {
        setCurrentStudent(student);
        setEditModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentStudent(null);
        setAddModalOpen(true);
    };

    const closeModal = () => {
        setEditModalOpen(false);
        setAddModalOpen(false);
    };

    const handleFormSubmit = () => {
        listStudents();
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    useEffect(() => {
        listStudents();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <button
                onClick={openAddModal}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                <i className="fa-solid fa-user-plus"></i> Adicionar Estudante
            </button>
            <table className="min-w-full">
                <thead className='bg-slate-100'>
                    <tr>
                        <th className="px-6 py-3 border-b-2">Nome</th>
                        <th className="px-6 py-3 border-b-2">Email</th>
                        <th className="px-6 py-3 border-b-2">Celular</th>
                        <th className="px-6 py-3 border-b-2">Data Nasc.</th>
                        <th className="px-6 py-3 border-b-2">CPF</th>
                        <th className="px-6 py-3 border-b-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className='odd:bg-white even:bg-slate-100 text-center text-slate-600'>
                            <td className="px-6 py-4 border-b">{student.name}</td>
                            <td className="px-6 py-4 border-b">{student.email}</td>
                            <td className="px-6 py-4 border-b">{student.cellphone}</td>
                            <td className="px-6 py-4 border-b">{student.birth_date}</td>
                            <td className="px-6 py-4 border-b">{student.cpf}</td>
                            <td className="px-6 py-4 border-b">
                                <button
                                    onClick={() => openEditModal(student)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    <i className="fa-solid fa-user-pen"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                >
                                    <i className="fa-solid fa-user-minus"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Modal */}
            <CustomModal isOpen={isAddModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Adicionar Estudante</h2>
                <StudentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Editar Estudante</h2>
                {currentStudent && <StudentForm student={currentStudent} onSuccess={handleFormSubmit} />}
            </CustomModal>
        </div>
    );
};

export default StudentsTable;
