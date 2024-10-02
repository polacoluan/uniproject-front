"use client";

import React, { useEffect, useState } from 'react';
import { Student } from '../../types/student';
import CustomModal from '../modal/modal';
import StudentForm from '../student/student-form';
import { listStudents } from '../../services/student/list-students';
import { deleteStudent } from '../../services/student/delete-student';
import HeadTable from '../table/table-header';
import BodyTable from '../table/table-body';

const StudentsTable = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

    const loadStudents = async () => {
        try {
            const response = await listStudents();
            setStudents(response);
        } catch (error) {
            console.error('Erro ao Buscar Estudantes:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteStudent(id);
            await loadStudents();
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
        loadStudents();
        setAddModalOpen(false);
        setEditModalOpen(false);
    };

    const headers = [
        {"id":1,"name":"Nome"},
        {"id":2,"name":"Email"},
        {"id":3,"name":"Celular"},
        {"id":4,"name":"Data Nasc."},
        {"id":5,"name":"CPF"},
        // {"id":6,"name":"Ações"},
    ];

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <button
                onClick={openAddModal}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                <i className="fa-solid fa-user-plus"></i> Adicionar Estudante
            </button>
            <Table className="min-w-full">
                <HeadTable headerInfo={headers} />
                <BodyTable bodyInfo={students} />
            </Table>

            <CustomModal isOpen={isAddModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Adicionar Estudante</h2>
                <StudentForm onSuccess={handleFormSubmit} />
            </CustomModal>

            <CustomModal isOpen={isEditModalOpen} onRequestClose={closeModal}>
                <h2 className="text-xl font-bold mb-4 text-center">Editar Estudante</h2>
                {currentStudent && <StudentForm student={currentStudent} onSuccess={handleFormSubmit} />}
            </CustomModal>
            <TableHe
        </div>
    );
};

export default StudentsTable;

{/* <TableBody>
{students.map((student) => (
    <TableRow key={student.id} className='odd:bg-white even:bg-slate-100 text-center text-slate-600'>
        <TableCell className="px-6 py-4 border-b">{student.name}</TableCell>
        <TableCell className="px-6 py-4 border-b">{student.email}</TableCell>
        <TableCell className="px-6 py-4 border-b">{student.cellphone}</TableCell>
        <TableCell className="px-6 py-4 border-b">{student.birth_date}</TableCell>
        <TableCell className="px-6 py-4 border-b">{student.cpf}</TableCell>
        <TableCell className="px-6 py-4 border-b">
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
        </TableCell>
    </TableRow>
))}
</TableBody> */}