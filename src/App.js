import React, { useState, useEffect } from "react";
import "./App.css";
import Table2 from "./table2";

function App() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tables")
      .then((res) => res.json())
      .then((tables) => {
        setTables(tables);
        if (tables.length > 0) {
          setSelectedTable(tables[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetch(`http://localhost:5000/api/${selectedTable}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [selectedTable]);

  const getColumnLetters = (count) =>
    Array.from({ length: count }, (_, i) =>
      String.fromCharCode(65 + i)
    );

  const filterColumns = (row) =>
    Object.keys(row).filter((col) => col.toLowerCase() !== "id");

  const filteredKeys = data.length > 0 ? filterColumns(data[0]) : [];

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-title">Table Output & Processing</div>
      </header>
      <main style={{ paddingTop: "80px" }}>
        <div style={{ marginBottom: 24 }}>
          <h2>Select table from database to display</h2>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            {tables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>

        <h2>Table 1</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="numbering"></th>
                {getColumnLetters(filteredKeys.length).map((letter) => (
                  <th className="ab-header" key={letter}>
                    {letter}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="numbering">1</th>
                {filteredKeys.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="numbering">{idx + 2}</td>
                  {filteredKeys.map((key) => (
                    <td key={key}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Table 2</h2>
        <Table2 data={data} />
      </main>
    </div>
  );
}

export default App;
