const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball')
//const bodyParser = require('body-parser');
//created route and response at GET request
//const testAPIRouter = require("./api/testAPI");
const auth = require('./auth/index');
const middleware = require('./auth/middleware')

const app = express();


app.use(volleyball);
app.use(cors({
    origin: '*'
}));
app.use(express.json()); //body parser
app.use(middleware.checkTokenSetUser)

app.get('/', (req,res) => {
    res.json({
        message: 'cos',
        user: req.user
    })
})

app.use('/auth',auth);

app.listen(5000, () => {
    console.log("server listening at port 5000")
});