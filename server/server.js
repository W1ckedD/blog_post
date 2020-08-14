const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
require('./config/db.js')();
const requireProfile = require('./middlewares/requireProfile');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

// Routes

app.use('/auth', require('./routes/users'));
app.use('/profiles', requireProfile, require('./routes/profiles'));
app.get('/', (req, res) => {
    return res.json({ server: 'Express' });
});

const { PORT, NODE_ENV } = process.env;
app.listen(PORT, () =>
    console.log(`Server listening in ${NODE_ENV} mode on port ${PORT}`)
);
