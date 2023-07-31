const express = require("express");
const cors = require("cors");
const app = express();
const { getData } = require("./demo_db");
const { checkEmail } = require("./demo_db");
const { createAccount } = require("./demo_db");

app.use(cors());
app.use(express.json());

app.get("/people", (req, res) => {
  getData((err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.send(result);
  });
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/checkEmail", (req, res) => {
  const { email } = req.body;
  checkEmail(email, (err, count) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).send(count);
    }
  });
});

app.post("/createAccount", (req, res) => {
  const { email_id, password } = req.body;
  console.log(email_id, password);
  createAccount(email_id, password, (err, createdAccount) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: createdAccount });
    }
  });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
