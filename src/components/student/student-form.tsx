"use client";

import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { createStudent } from '../../services/student/create-student';
import { updateStudent } from '../../services/student/update-student';
import { Student } from '../../types/student';

interface StudentFormProps {
  student?: Student;
  onSuccess: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSuccess }) => {
  const [formData, setFormData] = useState<Student>({
    id: 0,
    name: '',
    email: '',
    cellphone: '',
    birth_date: '',
    cpf: ''
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        id: 0,
        name: '',
        email: '',
        cellphone: '',
        birth_date: '',
        cpf: ''
      });
    }
  }, [student]);

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
      if (student) {
        await updateStudent(student.id, formData);
      } else {
        await createStudent(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Falha ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="name" className="block mb-2">Nome:</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="email" className="block mb-2">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="cellphone" className="block mb-2">Celular:</label>
      <InputMask
        id="cellphone"
        mask="(99) 99999-9999"
        type="text"
        name="cellphone"
        placeholder="(00) 00000-0000"
        value={formData.cellphone || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="birth_date" className="block mb-2">Data de Nascimento:</label>
      <input
        id="birth_date"
        type="date"
        name="birth_date"
        value={formData.birth_date || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="cpf" className="block mb-2">CPF:</label>
      <InputMask
        id="cpf"
        mask="999.999.999-99"
        type="text"
        name="cpf"
        placeholder="000.000.000-00"
        value={formData.cpf || ''}
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

export default StudentForm;
