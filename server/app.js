const cors = require("cors");
const express = require("express");
const { Client } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const dbClient = new Client({
  user: "demo_admin",
  host: "localhost",
  database: "demo",
  password: "",
  port: 5432,
});

dbClient.connect();

app.get("/api/read", (req, res) => {
  dbClient.query("SELECT * FROM test", (error, result) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Todo~
app.get("/api/read/:id", (req, res) => {
  const id = req.params.id;
  dbClient.query(`SELECT * FROM test WHERE id=${id}`, [id], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result.rows);
    }
    dbClient.end();
  });
});

// Todo end

app.post("/api/add", (req, res) => {
  const data = req.body;
  if (data.nickname == null) {
    nickname = "";
  }
  if (data.memo == null) {
    memo = "";
  }
  if (data.firstname && data.lastname && data.phone) {
    dbClient.query(
      `INSERT INTO test (firstname, lastname, nickname, phone, memo) VALUES ('${data.firstname}', '${data.lastname}', '${data.nickname}', '${data.phone}', '${data.memo}');`,
      (error, result) => {
        if (result) {
          console.log(`Changed Row Count ${result.rowCount}`);
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
});

// app.put("/api/update/:id", (req, res) => {
//   const id = req.params.id;
//   const { firstname, lastname, nickname, phone, memo } = req.body;
//   if (id) {
//     dbClient.query(
//       `UPDATE test SET firstname='${firstname}', lastname='${lastname}', nickname='${nickname}', phone='${phone}', memo='${memo}' WHERE id=${id}`,
//       (error, result) => {
//         if (error) {
//           res.sendStatus(500);
//         } else {
//           res.status(200);
//         }
//       }
//     );
//   } else {
//     res.sendStatus(400);
//   }
// });

// 추가하는 구문 업데이트

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, nickname, phone, memo } = req.body;
  if (id) {
    dbClient.query(
      `UPDATE test SET firstname='${firstname}', lastname='${lastname}', nickname='${nickname}', phone='${phone}', memo='${memo}' WHERE id=${id}`,
      (error, result) => {
        if (error) {
          res.sendStatus(500);
        } else {
          res.status(200).send("업데이트 됐는지 봐바라");
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    dbClient.query("DELETE FROM test WHERE id=$1", [id], (error, result) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.status(200).send("Deleted successfully");
      }
    });
  } else {
    res.sendStatus(400);
  }
});

app.listen(5158, () => console.log("Server started on port 5158"));
