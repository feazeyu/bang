const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const path = require('path');
const io = new Server(server);
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
let onlinePlayers = [];
app.use(express.static('client'));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(sessions({
    secret: "keyeyeyeyeyey",
    saveUninitialized:true,
    cookie: { maxAge: 1000*3600*24 },
    resave: false
}));

app.get('/bang', (req, res) => {
        console.log('Connected');
        session = req.session;
        if(session.userid){
            //res.sendFile(__dirname + '/client/game.html');
            res.send(session.userid);
        } else {
            res.redirect('/login');
        }
    }
);
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/client/register.html');
});
app.post('/register', (req, res) => {
    let data = req.body;
    if(isUnique(data.name, '/players') && isUnique(data.nickname, '/players')){
        res.redirect('/');
    } else {
        res.send('User already exists <br>'
        + '<a href="/register"> Back to register </a>');
    }
});
app.get('/login', (req, res)=>{
        res.sendFile(__dirname + '/client/login.html')
});
app.post('/login', (req, res) =>{
        onlinePlayers.push(new Player(req.body.name, req.body.password, req.session));
        res.send("Welcome back");
});
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/bang');
});

io.on('connection', (socket) => {

    }
);
server.listen(3000, () => {  console.log('listening on *:3000');});
var session;

class Card{
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.x = 100;
        this.y = 100;
    }

    render(){
        c.beginPath();
        c.arc(this.x, this.y, 25, 0, Math.PI*2, false);
        c.fill();
        c.closePath();
    }
}

class Hand {
    constructor(cards) {
        this.cards = cards;
    }

    renderHand(){
        for(let x = 0; x < this.cards.length; x++){
            this.cards[x].render();
        }
    }
}
class Player {
    constructor(name, pass, reqSession){
        let users = JSON.parse(fs.readFileSync(__dirname + '/users.json','utf8', function(err, data){}));
        let a = JSON.parse(fs.readFileSync(__dirname + '/players/' + users[name] + '.json', 'utf8', function(err, data){}));
        if(a.password === pass) {
            this.name = a.name;
            this.password = a.password;
            this.nickname = a.nickname;
            this.avatar = a.avatar;
            onlinePlayers[this.UID] = this;
            session=reqSession;
            session.userid = users[name];
            //console.log(onlinePlayers[this.UID]);
            return true;
        } else {
            return false;
        }
    };
    logout(){
        //TODO Logging out
    };

}
class Pile {
    constructor(){
        this.contents = newPile();
    }


}
var Deck = [];
function newPile(){
    for(let x = 0; x < 25; x++){
        Deck.push(new Card())
    }
}
function isUnique(name, directory){
    let directory2 = path.join(__dirname, directory);
    //console.log(directory2);
    fs.readdir(directory2, (err, files)=>{
        if(err){
            console.log('An error has occurred while trying to check for duplicate names: ' + err);
        }
        files.forEach((file)=>{
            fs.readFile(directory2 +'/'+ file, 'utf8', (err, data)=>{
                console.log("Submitted name: " + name);
                console.log("Checked against: " + JSON.parse(data).name);
                if(name === JSON.parse(data).name || name === JSON.parse(data).nickname){
                    console.log("Returning false..");
                    return false;
                } else {
                    console.log("Returning true");
                    return true;
                }
            })
        })
    })
}
//var testPlayer = new Player('000000001');
//isUnique('name', '/players');