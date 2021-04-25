const express = require('express');
const cors = require('cors');

// Routers
const barsRouter = require('./routes/api/bars');
const usersRouter = require('./routes/api/users');

// Load config
require('dotenv').config();

// DB connection
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) =>
	res.status(200).send({ msg: 'Welcome to Coworking API' })
);

app.use('/api/bars', barsRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port: ${PORT}`));
