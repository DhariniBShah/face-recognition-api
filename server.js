const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
/*  database chances to run on localhost
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'password',
    database : 'face-recognition-db'
*/    

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})

app.use(bodyParser.json());
app.use(cors());

/* endpoints for face recognition api*/
app.get('/', (req, res) => { res.send('this is root') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister( db, bcrypt)) 
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageUrl',image.handleApiCall())