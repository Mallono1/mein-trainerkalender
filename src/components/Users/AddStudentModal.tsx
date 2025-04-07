import React, { useState } from 'react';
import ModalContainer from '../ModalContainer';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: any;
}

interface InputField {
  key: string;
  label: string;
  type: string;
}

const inputFields: InputField[] = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
  // { key: 'country', label: 'Country', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'street', label: 'Street', type: 'text' },
  { key: 'houseNumber', label: 'House Number', type: 'text' },
  { key: 'postalCode', label: 'Postal Code', type: 'text' },
];

const InputField: React.FC<{
  key: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ key, label, type, value, onChange }) => {
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

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
  };

  return (
    <ModalContainer title="Add New Student" isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {inputFields.map(({ key, label, type }) => (
          <InputField
            key={key}
            label={label}
            type={type}
            value={formData[key] || ''}
            onChange={(value) => handleChange(key, value)}
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

export default AddStudentModal;
