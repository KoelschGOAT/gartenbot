const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 2000;
app.use(cors());
app.use(express.json());

// Route to get all sensordata
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM sensor ORDER BY TimeStamp ASC LIMIT 10", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("fetching all",result)
    res.send(result);
  });
});
app.get("/api/latest", (req, res) => {
  db.query("SELECT * FROM   sensor ORDER  BY TimeStamp DESC LIMIT  1;", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("fetching latest",result)
    res.send({"id":result[0].id , "pegel": result[0].pegel, "feuchte": result[0].feuchte, "TimeStamp": result[0].TimeStamp});
  });
});
app.get("/api/user", (req, res) => {
  db.query("SELECT * FROM user", (err, result,fields) => {
    if (err) {
      console.log(err);
    }

    res.send({ "user_id": result[0].user_id, "username": result[0].username, "drain":  result[0].drain });
  });
});



app.put("/api/user/:user_id", (req, res) => {
  
  db.query(`UPDATE user SET drain='${req.body.drain}' WHERE user_id=${req.params.user_id}`, (err, result) => {
    if (err) {
      console.log(err);
    }
   console.log(result)
    res.send(result);
  });
  
});


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
