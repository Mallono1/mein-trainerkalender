import React, { useCallback } from 'react';
import Table from '../Table';
import { Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
import { setViewUserID } from '../../slicers/userSlicer';
import { RootState } from '@/redux/store';
import { User } from '@/types';

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const currentCoachId = useSelector((state: RootState) => state.user.userId);

  interface Column<T> {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }

  const dispatch = useDispatch();
  // ----- I WILL TEMPORARILY COMMENT THIS BECAUSE THE OTHER COMPONENTS ARE RE RENDERING WHEN I ADD QUERY -----

  // const userIdFromQuery = useSelector(
  //   (state: RootState) => state.user.viewUserID
  // );
  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const queryIdFromUrl = searchParams.get('userId');
  //   if (queryIdFromUrl) {
  //     dispatch(setViewUserID(queryIdFromUrl));
  //   }
  // }, [searchParams, dispatch]);

  const handleSetQueryId = useCallback(
    (id: number | string) => {
      dispatch(setViewUserID(id));
      // setSearchParams({ queryId: id as string });
    },
    [dispatch],
  );

  function toLocalTime(isoString: string): string {
    const date = new Date(isoString);

    return date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  }

  const columns: Column<User>[] = [
    { key: '_id', label: 'ID' },
    {
      key: 'firstName',
      label: 'Name',
      render: (user) => <span>{user.firstName + ' ' + user.lastName}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (user) => (
        <span className="underline cursor-pointer">{user.email}</span>
      ),
    },
    { key: 'role', label: 'Role' },
    {
      key: 'createdAt',
      label: 'Joined Date',
      render: (user) => <span>{toLocalTime(user.createdAt.toString())}</span>,
    },
  ];

  return (
    <div className="min-h-[90vh] max-h-[4rem] overflow-y-auto">
      {users && (
        <>
          <Table
            columns={columns}
            data={users}
            actions={(users) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSetQueryId(users._id)}
                  className="flex items-center gap-1 text-white bg-gradient-to-r from-green-500 to-green-700 px-2 py-1 rounded-lg shadow-md cursor-pointer"
                >
                  <Eye size={13} />
                  View
                </button>
              </div>
            )}
          />
        </>
      )}
    </div>
  );
};

export default UsersTable;
