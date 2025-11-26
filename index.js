const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "testdb",
  port: 5432,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running on Linux!");
});

// Fetch users from DB
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Insert a user
app.post("/users", async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
    res.send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

