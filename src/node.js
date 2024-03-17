import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2008",
  database: "url",
});

db.connect((err) => {
  if (err) throw err;
  console.log("db connected");
});

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(3000);
app.use(bodyParser.json());

app.post("/url", (req, res) => {
  let id = new Date().getTime();
  const selectQuery = `SELECT * FROM urls WHERE url LIKE '%${id}%'`;
  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error("Error querying data:", err);
      return;
    }
    if (rows.length != 0) {
      id += "-";
      (id += parseInt(rows.length) + parseInt(1)), toString();
    } else id += "-1";
    id = "th.ly/" + id;
    const insertQuery = "INSERT INTO urls (url, real_url) VALUES (?,?)";

    db.query(insertQuery, [id, req.body.url], (err, result) => {
      if (err) {
        console.error("Error inserting record:", err);
        return;
      }
      console.log("Inserted record with ID:", result.insertId);
    });
    res.json(id);
  });
});
