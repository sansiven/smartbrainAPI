const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')


const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1haveadream',
    database : 'smartbrain'
  }
});



const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
	res.send(database.users);
})

app.post('/signin',(req,res) => {signin.handleSignin(req, res, db, bcrypt)})
///////////////////, signin.handleSignin(db, bcrypt)} -----can be writtes as this also ; see advanced functions
app.post('/register', (req, res) =>{register.handleRegister(req , res, db, bcrypt)})  //this is dependency injection

app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
app.listen(3000, () => {
	console.log('App is running on port 3000');
})



/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});
 
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/




/*const express = require('express');

const app = express();


app.get('/', (req,res) => {
	res.send('this is working');
})


app.listen(3000, () => {
	console.log('App is running on port 3000');
})*/
/*
/ --> route root which responds with tjis is working
/signin --> route POST req, respond with success/fail
/register --> POSt req = new user obj
/profile/:userId --> GET = user //ability toaccess profile of use 
/image --> PUT --> updates user obj

*/
