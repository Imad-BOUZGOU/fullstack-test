const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path')


const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080; // Step 1


app.get("/", function (req, res) {
  res.redirect('projects');
});

app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect("mongodb+srv://imad:imad1995@cluster0-1aaxg.mongodb.net/kissoDB?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const projectRouter = require('./backend/routes/projects');

app.use('/projects', projectRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}


// HTTP request logger
app.use(morgan('tiny'));

app.listen(PORT, function () {
  console.log("app listening on port "+PORT);
});
