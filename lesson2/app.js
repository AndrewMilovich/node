const express = require('express');
const path = require("path");
const {engine} = require('express-handlebars')


const app = express();
app.use(express.json())
app.use( express.urlencoded({extends:true}))

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

// app.get('/', (req, res) => {
//     req.send('Welcome')
// })

app.get('/user',(req,res)=>{
   res.render('user');
})


app.use((req,res)=>{
    res.render('errorPage')
})
app.listen(5000, () => {
})
