require('dotenv').config({path: './env'})
const path = require('path')

const jwt = require('jsonwebtoken');
const express = require('express');
const port = process.env.PORT || 5000;
const auth = require("./middleware/auth.js");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {sequelize} = require("./models")

const app = express();
app.set("view engine","ejs")
app.use(express.urlencoded({extended: false}));
//In order to access to file by the outside
app.use('/public', express.static('public'))
app.use('/uploads', express.static('public/uploads'))
//corsOptions is used to allow specific addresses to interact with your API
const corsOptions = {
    //The origin is at which address is your frontend server
    origin: 'http://localhost:3000'
}
  
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(bodyParser.json());

require('./routes/routes.js')(app);

app.get('/', auth,(req, res) => {
    res.send({
        message: "Hello World"
    });
})

sequelize.sync()
    .then(() => {

        app.listen(port, () => {
        console.log(`Server started on port ${port}`)
        });
    });