const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
var multer = require('multer');

var upload = multer(); 

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(require('./middleware/checkSessionId'));

app.get('/signup', function (req, res) {
    res.render('signup')
});

app.get('/signin', function (req, res) {
    res.render('signin')
});

app.post('/signup', require('./controllers/signupController'));
app.post('/signin', require('./controllers/signinController'));

app.listen(3000);