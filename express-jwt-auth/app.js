const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware')


const app = express();


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// //*******coockies Example*******
// app.get('/set-cookies', (req,res)=>{
  
//   // res.setHeader('Set-Cookie','newUser=true');
//   res.cookie('NewUser',false);
//   // res.cookie('isEmployee',true,{maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true});
//    res.cookie('isEmployee',true,{maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

//   res.send('you got the cookies!')
// });

// app.get('/read-cookies',(req,res)=>{

//     const cookies = req.cookies;
//     console.log(cookies);

//     res.json(cookies);
// });
// //*******coockies Example*******