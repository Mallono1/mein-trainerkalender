import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  tableName: string;
  columns: Column<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
}

const TableV2 = <T,>({ tableName, columns, data, actions }: TableProps<T>) => {
  return (
    <div className='w-full'>
      <div className='flex bg-gray-200 px-5 py-2 text-slate-600 text-md font-semibold rounded-lg'>
        <h1 className='flex items-center gap-3'>
          {tableName}
          <span className='text-sm bg-indigo-200 text-indigo-600 w-5 h-5 text-center rounded-md'>
            {data.length}
          </span>
        </h1>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-700'>
          <thead className='text-gray-800 rounded-t-lg border-b border-gray-300'>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-2 font-semibold first:rounded-tl-lg last:rounded-tr-lg`}
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
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className='hover:bg-gray-100 transition duration-200 border-b border-gray-300'
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-3 min-w-[13rem] max-w-[13rem] ${
                      colIndex === 0 ? 'border-r border-gray-300' : ''
                    } ${
                      colIndex === columns.length - 1
                        ? 'border-l border-gray-300'
                        : 'border-r border-gray-300'
                    }`}
                  >
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
    </div>
  );
};

export default TableV2;
