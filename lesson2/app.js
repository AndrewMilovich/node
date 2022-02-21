const express = require('express');
const path = require("path");
const {engine} = require('express-handlebars')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extends: true}))

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [];

app.get('/login', (req, res) => {
    res.render('login');
})


app.get('/users', (req, res) => {
    const {age, city} = req.query;

    let filter = [...users];

    if (age) {
        filter = filter.filter(value => value.age === age)
    }
    if (city) {
        filter = filter.filter(value => value.city === city)
    }

    res.render('users', {filter});
})

app.get('/users/:userId', (req, res) => {

    const {userId} = req.params;
    const user = users[userId - 1];

    res.render('user', {user})
})

app.post('/login', (req, res) => {

    const filterEmail = users.find(value => value.email === req.body.email)

    if (filterEmail) {
        res.redirect('/errorPage');
        return;
    }

    users.push({...req.body, id: users.length + 1});
    res.redirect('/users')
})

app.post('/delete/:userId', (req, res) => {
    const {userId} = req.params;
    users.splice(+userId - 1, 1);
    res.redirect('/users');
})

app.get('/errorPage', (req, res) => {
    res.render('errorPage');
})

app.get('/signIn', (req, res) => {
    res.render('signIn');
})
app.get('/user', (req, res) => {
    res.render('user');
})

app.post('/signIn', (req, res) => {

    let filter = [...users];

    filter = users.find(value => value.email === req.body.email && value.password === req.body.password)

    if (filter) {
        res.render('user', {filter});
        return
    }

    res.redirect('notFoundUser');
})

app.use((req, res) => {
    res.render('errorPage');
})

app.listen(5000, () => {
})
