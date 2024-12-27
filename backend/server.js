const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongodb = require('./config_file/mogodb');
const bodyParser = require('body-parser');

dotenv.config({path: path.join(__dirname, 'config_file', 'config.env')})

const app = express();
const port = 4000;

app.use(cors())
app.use(bodyParser.json());

//mongodb connection
mongodb()

// http methods
app.use("/api", require("./src/routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
