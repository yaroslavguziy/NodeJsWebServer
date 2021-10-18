require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/notesRouter');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api', authRouter);
app.use('/api/users', authMiddleware, userRouter);
app.use('/api/notes', authMiddleware, noteRouter);

const PORT = +process.env.PORT || 8080;
const DB = process.env.DB;

const start = async () => {
  try {
    await mongoose.connect(DB);

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(`Error on server: ${err.message}`);
  }
};

start();
