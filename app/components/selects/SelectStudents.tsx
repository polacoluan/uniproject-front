// app/components/SelectStudents.tsx
"use client"; // Ensure this is present

import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../../services/api';

interface DataOption {
  id: number;
  name: string;
}

interface SelectComponentProps {
  onSelect: (selectedValue: number | '') => void; // Prop to pass selected value back
  value: number;
}

const SelectStudents: React.FC<SelectComponentProps> = ({ onSelect, value }) => {
  const [options, setOptions] = useState<DataOption[]>([]); // Store the options

  // Fetch options from the API when the component mounts
  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchStudents(); // API call to fetch data
      setOptions(data); // Set options to state
    };

    loadOptions();
  }, []);

  // Handle change in select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    onSelect(selectedValue); // Pass the selected value to the parent component
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
            {option.name} {/* Display the name or other appropriate field */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStudents;
