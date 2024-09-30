// app/components/StudentsTable.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { Student } from '../../types/student';
import CustomModal from '../modal/Modal';
import StudentForm from './StudentForm';
import { fetchStudents, deleteStudent } from '../../services/api';

const StudentsTable = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

    // List students
    const listStudents = async () => {
        try {
            const response = await fetchStudents();
            setStudents(response);
        } catch (error) {
            console.error('Erro ao Buscar Estudantes:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        try {
            await deleteStudent(id);
            await listStudents(); // Refresh the student list after deletion
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

    // Handle form submission success
    const handleFormSubmit = () => {
        listStudents(); // Refresh the student list after adding or updating
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    // Fetch students on component mount
    useEffect(() => {
        listStudents();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <button
                onClick={openAddModal}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Adicionar Estudante
            </button>
            <table className="min-w-full bg-white">
                <thead>
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
                        <tr key={student.id} className='odd:bg-white even:bg-slate-100'>
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
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
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
                <h2 className="text-xl font-bold mb-4">Adicionar Estudante</h2>
                <StudentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            {/* Edit Modal */}
            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4">Editar Estudante</h2>
                {currentStudent && <StudentForm student={currentStudent} onSuccess={handleFormSubmit} />}
            </CustomModal>
        </div>
    );
};

export default StudentsTable;
