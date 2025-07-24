const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// === PostgreSQL ===
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/tablemulah",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// === API Routes ===
app.get("/api/tables", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);
    res.json(result.rows.map(r => r.table_name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/:table", async (req, res) => {
  try {
    const table = req.params.table;
    const result = await pool.query(`SELECT * FROM ${table}`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === React Frontend ===
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
