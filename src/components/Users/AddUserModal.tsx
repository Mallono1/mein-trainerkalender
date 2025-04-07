import React, { useState } from 'react';
import ModalContainer from '../ModalContainer';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputField {
  label: string;
  type: string;
}

const inputFields: InputField[] = [
  { label: 'Name', type: 'text' },
  { label: 'Email', type: 'email' },
  { label: 'Password', type: 'password' },
  { label: 'Confirm Password', type: 'password' },
];

const InputField: React.FC<{
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69859467]"
      />
    </div>
  );
};

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', formData);
    onClose();
  };

  return (
    <ModalContainer title="Add New User" isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {inputFields.map(({ label, type }) => (
          <InputField
            key={label}
            label={label}
            type={type}
            value={formData[label] || ''}
            onChange={(value) => handleChange(label, value)}
          />
        ))}
        <div className="col-span-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-white p-2 rounded-lg transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddUserModal;
