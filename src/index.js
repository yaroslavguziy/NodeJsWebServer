const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const { authMiddleware } = require('./middlewares/authMiddleware');
const { authRouter } = require('./controllers/authController');
const { userRouter } = require('./controllers/userController');
const { notesRouter } = require('./controllers/noteController');

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/auth', authRouter);
app.use('/api/users', [authMiddleware], userRouter);
app.use('/api/notes', [authMiddleware], notesRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT);
  } catch (err) {
    console.log(`Error on server: ${err.message}`);
  }
};

start();
