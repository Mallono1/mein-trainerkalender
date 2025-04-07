import React, { useState, useEffect } from 'react';
import ModalContainer from '../ModalContainer';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    profileImage: string | null;
    fullName: string;
    email: string;
    username: string;
    role: string;
    status: string;
    joinedDate: string;
  };
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    username: user.username || '',
    role: user.role || '',
    status: user.status || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        username: user.username || '',
        role: user.role || '',
        status: user.status || '',
      });
    }
  }, [user]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Updated User Data:', formData);
    onClose();
  };

  return (
    <ModalContainer title="Edit User" isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex flex-col space-y-1 col-span-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter full name"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="Enter username"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            placeholder="Enter role"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="col-span-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 text-white p-2 rounded-lg transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default EditUserModal;
