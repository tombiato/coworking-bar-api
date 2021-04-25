const express = require('express');

// Routers
const barsRouter = require('./routes/api/bars');

const app = express();

app.get('/', (req, res) =>
	res.status(200).send({ msg: 'Welcome to Coworking API' })
);

app.use('/api/bars', barsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port: ${PORT}`));
