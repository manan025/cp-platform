//? Importing Modules
const express = require('express');
const ques = require('./question_status.json');
const fs = require('fs');
const request = require('request');
const session = require('express-session');
const flash = require('express-flash');


//? Global vars
const questions = ques
var cred = []

const app = express();
app.listen(8000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

app.use(express.urlencoded({ extended: false }));

app.use("/submit", require('./backend.js'));

//? Links
app.get('/', function(req, res){
    if(cred.length == 0) {
        res.render('home')
    }
    else{
        res.redirect('/questions')
    }
})


app.get('/questions', function(req, res){
    if(cred.length != 0) {
        var points = 0
        for(let i=0; i<questions.length;i++){
            const q = questions[i]
            if(q.status === 'AC'){
                points = points + 100
            }
        }

        res.render('questions', {questions: questions, points: points})
    }
    else{
        res.redirect('/')
    }
})


app.get('/ques/:id', function(req, res){
    let msg = fs.readFileSync('msg.json', 'utf8');
    msg = JSON.parse(msg)

    if (msg !== 'error'){
        msg = msg.result
    }
    else{
        msg = ''
    }

    fs.writeFileSync('./msg.json', JSON.stringify('error'), function(err){
        console.log('saved')
    })

    if(cred.length != 0) {
        const p = questions[parseInt(req.params.id)].path
        res.render('ques', {path: p, id: req.params.id, msg: msg})
    }
    else {
        res.redirect('/')
    }
})

app.post('/', function(req, res){
    // Store login data in JSON
    // console.log(crypto.createHash('sha256').update(req.body.password).digest('base64'))
    // if (crypto.createHash('sha256').update(req.body.password).digest('base64'))
    let data = {
        school: req.body.school,
        name1: req.body.name1,
        name2: req.body.name2
    }
    // store in data.json
    fs.writeFile('./login.json', JSON.stringify(data), function(err){
        console.log('saved')
    })

    cred.push(data)

    res.redirect('/questions')

})

app.post('/ques/:id', function(req, res){
    const p = __dirname + "/" + req.body.file
    const id = req.params.id
    // check key from id
    const key = questions[parseInt(id)].key
    // check language from req.body.file extension
    let l = req.body.file.split('.')[1].trim()
    if (l === 'py') {
        l = "py3"
    }
    else {
        l = 'cpp'
    }

    request.post('http://localhost:8000/submit', {
        json: {
            "id": id,
            "key": key,
            "program": p,
            "language": l
        }
    })
    
    res.redirect('/ques/' + req.params.id)
})


