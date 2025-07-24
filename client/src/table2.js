import React from "react";

const Table2 = ({ data }) => {
  const getValue = (index) => {
    const found = data.find(row =>
      (row["Index #"] || row["index#"]) === index
    );
    const value = found ? (found["Value"] ?? found["value"]) : null;
    return value !== null ? Number(value) : null;
  };

  const A5 = getValue('A5');
  const A20 = getValue('A20');
  const A15 = getValue('A15');
  const A7 = getValue('A7');
  const A13 = getValue('A13');
  const A12 = getValue('A12');

  const values = {
    Alpha: A5 !== null && A20 !== null ? Math.round(A5 + A20) : '',
    Beta: A15 !== null && A7 !== null ? (A7 !== 0 ? Math.round(A15 / A7) : '∞') : '',
    Charlie: A13 !== null && A12 !== null ? Math.round(A13 * A12) : ''
  };

  const tableData = [
    { category: "Alpha", value: values.Alpha },
    { category: "Beta", value: values.Beta },
    { category: "Charlie", value: values.Charlie }
  ];

  return (
    <div className="table-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
      <table style={{ margin: '0 auto', minWidth: 400 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Category</th>
            <th style={{ textAlign: 'center' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.category}>
              <td style={{ textAlign: 'center' }}>{row.category}</td>
              <td style={{ textAlign: 'center' }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
