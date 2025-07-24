const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tablemulah',
  password: 'admin',
  port: 5432,
});

//Get list of tables dynamically
app.get('/api/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    res.json(result.rows.map(row => row.tablename)); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//Get data from any table
app.get('/api/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM ${table}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
