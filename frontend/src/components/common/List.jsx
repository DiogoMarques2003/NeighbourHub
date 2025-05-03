const List = ({ headers, rows, renderRow, className = '' }) => {
  if (!rows || rows.length === 0) return <p className="text-gray-500">Nenhum dado disponível.</p>;

  return (
    <div className={`overflow-x-auto rounded-xl shadow-md ${className}`}>
      <table className="min-w-full text-sm text-left text-gray-600 bg-white rounded-xl overflow-hidden">
        <thead className="sticky top-0 bg-gradient-to-r from-[#3e94bf] to-[#72bcd4] text-white text-sm uppercase tracking-wide shadow-sm z-10">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} scope="col" className="px-6 py-4 font-semibold">
                {typeof header === 'string' ? header : header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, rowIdx) =>
            renderRow ? (
              renderRow(row, rowIdx)
            ) : (
              <tr
                key={rowIdx}
                className="hover:bg-blue-100 transition-colors duration-200 ease-in-out even:bg-blue-50 odd:bg-white"
              >
                {headers.map((header, colIdx) => {
                  const key = typeof header === 'string' ? header : header.key;
                  return (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                      {row[key]}
                    </td>
                  );
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
