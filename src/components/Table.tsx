import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
}

const Table = <T,>({ columns, data, actions }: TableProps<T>) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-700'>
        <thead className='bg-gray-900 text-gray-100 rounded-t-lg'>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className='px-6 py-3 font-semibold first:rounded-tl-lg last:rounded-tr-lg'
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th className='px-6 py-3 font-semibold text-center rounded-tr-lg'>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className='bg-white shadow-md'>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'
              } hover:bg-gray-100 transition duration-200`}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className='px-6 py-4'>
                  {column.render
                    ? column.render(item)
                    : String(item[column.key])}
                </td>
              ))}
              {actions && (
                <td className='px-6 py-4 text-center'>{actions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
