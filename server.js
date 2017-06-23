const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const multer = require('multer');

const port = process.env.PORT || 8080;

const upload = multer();
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(require('./middleware/checkSessionId'));

app.get('/', function(req, res) {
    if (req.isLoggedin) {
        res.render('index', {
            isLoggedin: true,
            user: req.user
        });
    } else {
        res.render('index', { isLoggedin: false });
    }
});

app.get('/signup', function (req, res) { 
    res.render('signup');
});

app.get('/signin', function (req, res) { 
    res.render('signin');
});

app.post('/signup', require('./controllers/signupController'));
app.post('/signin', require('./controllers/signinController'));
app.post('/signout', require('./controllers/signoutController'));

app.listen(port);