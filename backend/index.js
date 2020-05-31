const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');

const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8080; // Step 1


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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));

app.listen(PORT, function () {
  console.log("app listening on port "+PORT);
});
