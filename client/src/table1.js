import React from "react";

const Table1 = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="numbering"></th>
            <th className="ab-header">A</th>
            <th className="ab-header">B</th>
          </tr>
          <tr>
            <th className="numbering">1</th>
            <th>Index #</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row["Index #"] || idx}>
              <td className="numbering">{idx + 2}</td>
              <td>{row["Index #"]}</td>
              <td>{row["Value"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
