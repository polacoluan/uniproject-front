"use client";

import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface DataOption {
  id: number;
  name: string;
}

interface SelectComponentProps {
  onSelect: (selectedValue: number | '') => void;
  value: number;
}

const SelectStudents: React.FC<SelectComponentProps> = ({ onSelect, value }) => {
  const [options, setOptions] = useState<DataOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const response = await api.get('/student/');
      setOptions(response.data.data);
    };

    loadOptions();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    onSelect(selectedValue);
  };


  return (
    <div>
      <label htmlFor="select-students" className="block mb-2">Selecione um Estudante:</label>
      <select
        id="select-students"
        name="student_id"
        value={value}
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 border rounded"
      >
        <option value="">--Selecione--</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStudents;
