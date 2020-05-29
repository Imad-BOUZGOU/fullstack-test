const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.get("/", function (req, res) {
  res.redirect('projects');
});

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const projectRouter = require('./routes/projects');

app.use('/projects', projectRouter);



app.listen(5000, function () {
  console.log("app listening on port 5000!");
});
