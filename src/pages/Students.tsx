import React, { memo, useEffect, useState } from 'react';
import Button from '../components/Button';
import { ListFilterPlus } from 'lucide-react';
import AddStudentModal from '../components/Users/AddStudentModal';
import FilterUserModal from '../components/Users/FilterUserModal';
import UserSearch from '../components/Users/UserSearch';
import { User } from '@/types';
import api from '@/lib/api';
import UsersTable from '@/components/Users/UsersTable';

const Students: React.FC = memo(() => {
  const [isAddUserModalOpen, setIsAddUserModelOpen] = useState<boolean>(false);
  const [isFilterUserModalOpen, setIsFilterUserModelOpen] =
    useState<boolean>(false);

  const handleOpenAddUserModal = () => {
    setIsAddUserModelOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModelOpen(false);
  };

  const handleOpenFilterUserModal = () => {
    setIsFilterUserModelOpen(true);
  };

  const handleCloseFilterUserModal = () => {
    setIsFilterUserModelOpen(false);
  };

  const handleAddStudent = async (formData) => {
    const res = await api.post('coach/addStudent', formData).then((r) => {
      setUsers((prev) => [...(prev || []), r.data]);
    });
  };
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('coach/getStudents').then((r) => {
        setUsers(r.data);
      });
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-grow w-full justify-between align-center">
        <div className="flex items-end w-full flex-col lg:flex-row lg-items-center gap-3">
          <UserSearch />
          <div className="h-9">
            <Button
              additionalStyle="bg-white border border-[#0077b6]"
              onClick={handleOpenFilterUserModal}
            >
              <ListFilterPlus
                className="text-[#0077b6] cursor-pointer"
                size={20}
              />
              <span className="text-[#0077b6] pl-1">Filter</span>
            </Button>
          </div>
          <div className="h-9">
            <Button
              onClick={handleOpenAddUserModal}
              title="Add Student"
              additionalStyle="bg-gradient-to-r from-[#00b4d8] to-[#0077b6]"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex gap-5 mt-5">
          {users && (
            <div className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <UsersTable users={users} />
            </div>
          )}
        </div>
      </div>

      {/* 
        //  A FIX NEEDED HERE BECAUSE WHEN I CLICK THE FILTER AND ADD USER BUTTON MODAL ALL THE COMPONENTS IN THE USER IS RE-RENDERING
        //  THAT IS A BAD PRACTICE AND GIVES A LOW PERFORMANCE ON OUR APPLICATION
        //  I WILL FIX THIS SOON!!!
      */}

      {isAddUserModalOpen && (
        <AddStudentModal
          isOpen={isAddUserModalOpen}
          onClose={handleCloseAddUserModal}
          onAdd={handleAddStudent}
        />
      )}

      {isFilterUserModalOpen && (
        <FilterUserModal
          isOpen={isFilterUserModalOpen}
          onClose={handleCloseFilterUserModal}
        />
      )}
    </>
  );
});

export default Students;
