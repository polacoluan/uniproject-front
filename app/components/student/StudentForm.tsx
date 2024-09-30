// app/components/StudentForm.tsx
"use client"; // Ensure this is present

import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask'; 
import { createStudent, updateStudent } from '../../services/api';
import { Student } from '../../types/student';

interface StudentFormProps {
  student?: Student; // Accept a Student object
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
      onSuccess(); // Notify parent component
    } catch (error) {
      console.error('Falha ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="name" className="block mb-2">Insira o nome do estudante:</label>
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

      <label htmlFor="email" className="block mb-2">Insira o email do estudante:</label>
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
      
      <label htmlFor="cellphone" className="block mb-2">Insira o celular do estudante:</label>
      <InputMask
        id="cellphone"
        mask="(99) 99999-9999"
        type="text"
        name="cellphone"
        placeholder="Celular"
        value={formData.cellphone || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="birth_date" className="block mb-2">Insira o nascimento do estudante:</label>
      <input
        id="birth_date"
        type="date"
        name="birth_date"
        value={formData.birth_date || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />

      <label htmlFor="cpf" className="block mb-2">Insira o cpf do estudante:</label>
      <InputMask
        id="cpf"
        mask="999.999.999-99"
        type="text"
        name="cpf"
        placeholder="CPF"
        value={formData.cpf || ''}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded"
        required
      />
      {/* Add other form fields similarly */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {student ? 'Atualizar Estudante' : 'Adicionar Estudante'}
      </button>
    </form>
  );
};

export default StudentForm;
