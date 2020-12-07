let express = require("express"),
    bodyParser = require('body-parser'),
    path = require('path'),
    expressLayout = require('express-ejs-layouts'),
    app = express(),
    port = 3000,
    db = require("./services/dbConnection")

const underscore = require('underscore');

const { getOrder } = require("./controller/serverSide")
const { Product, Account, Cart } = require("./models")
const upload = require('./services/ImageUpload')

global.app = app

// Static Files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(expressLayout)

app.use('/', require('./router/app_route'))
app.use("/api/products", require("./router/api_product"))
app.use('/product', require('./router/products'))
app.use("/api/auth", require("./router/auth"))
app.use('/admin', require('./router/admin'))

// this is for generic routes error
app.get('*', (req, res) => {
    app.set('layout', false)
    return res.render('pages/404', {
        title: "Page not Found"
    });
})

function connect(_port) {
    app.listen(_port, () => console.log(`Listening to port ${port}!`))
}
db.connect();
try {
    connect(port)
} catch (error) {
    ++port;
    connect(port)
}