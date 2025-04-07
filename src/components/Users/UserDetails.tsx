import React, { useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  Archive,
  CalendarCheck2,
  ChevronLeft,
  IdCard,
  Mail,
  Pencil,
  Power,
  ShieldAlert,
  User,
} from 'lucide-react';
import { setViewUserID } from '../../slicers/userSlicer';
import Button from '../Button';
import EditUserModal from './EditUserModal';
import ArchiveUserModal from './ArchiveUserModal';

interface UserDetailsProps {
  selectedUser: {
    id: string;
    profileImage: string | null;
    fullName: string;
    email: string;
    username: string;
    role: string;
    status: string;
    joinedDate: string;
  } | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ selectedUser }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.viewUserID);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);

  const memoizedUser = useMemo(() => {
    if (userId) {
      return {
        id: userId,
        profileImage: null,
        fullName: 'Allen Buenaventura',
        email: 'allen@gmail.com',
        username: '@allenbnvtra11',
        role: 'Admin',
        status: 'Active',
        joinedDate: '05/11/2023',
      };
    }
    return selectedUser;
  }, [userId, selectedUser]);

  const handleCloseUserDetails = useCallback(() => {
    dispatch(setViewUserID(null));
  }, [dispatch]);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleArchiveClick = () => {
    setArchiveModalOpen(true);
  };

  return (
    <div>
      {memoizedUser ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={handleCloseUserDetails}
              className="text-gray-700 hover:text-gray-800 cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          </div>
          <div className="mt-7 mb-3 flex flex-col justify-center items-center gap-1">
            {memoizedUser.profileImage ? (
              <img
                src={memoizedUser.profileImage}
                alt="User Profile"
                className="w-30 h-30 rounded-full border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-30 h-30 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100">
                <User size={92} className="text-gray-500" />
              </div>
            )}
            <span className="text-md text-gray-500 -mb-2">
              {memoizedUser.username}
            </span>
            <span className="text-2xl font-semibold text-gray-700">
              {memoizedUser.fullName}
            </span>
          </div>

          <div className="flex w-full h-9 gap-2 mb-5">
            <Button
              additionalStyle="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] w-full gap-1"
              onClick={handleEditClick}
            >
              <Pencil size={15} />
              Edit
            </Button>
            <Button
              additionalStyle="bg-gradient-to-r from-red-500 to-red-700 w-full gap-1"
              onClick={handleArchiveClick}
            >
              <Archive size={15} />
              Archive
            </Button>
          </div>

          <p className="mb-1 text-gray-600 text-sm font-semibold">
            Personal Details
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
            <strong className="text-gray-800">
              <IdCard />
            </strong>{' '}
            {memoizedUser.id}
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
            <strong className="text-gray-800">
              <Mail />
            </strong>{' '}
            {memoizedUser.email}
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
            <strong className="text-gray-800">
              <ShieldAlert />
            </strong>{' '}
            {memoizedUser.role}
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
            <strong className="text-gray-800">
              <CalendarCheck2 />
            </strong>{' '}
            {memoizedUser.joinedDate}
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
            <strong className="text-gray-800">
              <Power />
            </strong>
            <span
              className={`px-2 py-1 rounded-md ${
                memoizedUser.status === 'Active'
                  ? 'text-green-600 bg-green-100'
                  : 'text-red-600 bg-red-100'
              }`}
            >
              {memoizedUser.status}
            </span>
          </p>
        </div>
      ) : (
        <p className="flex h-[90vh] items-center justify-center text-gray-500 text-center">
          Please view a user to display user details.
        </p>
      )}

      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={
            memoizedUser
              ? { ...memoizedUser, id: String(memoizedUser.id) }
              : {
                  id: '',
                  profileImage: null,
                  fullName: '',
                  email: '',
                  username: '',
                  role: '',
                  status: '',
                  joinedDate: '',
                }
          }
        />
      )}

      {isArchiveModalOpen && (
        <ArchiveUserModal
          isOpen={isArchiveModalOpen}
          onClose={() => setArchiveModalOpen(false)}
          onConfirm={() => {
            console.log('Archiving user:', memoizedUser?.id);
            setArchiveModalOpen(false);
          }}
          user={
            memoizedUser
              ? { id: String(memoizedUser.id), fullName: memoizedUser.fullName }
              : null
          }
        />
      )}
    </div>
  );
};

export default UserDetails;
