const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
require('./config/db.js')();
const requireUser = require('./middlewares/requireUser');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

// Routes

app.use('/api/posts', requireUser, require('./routes/posts'));
app.use('/api/comments', requireUser, require('./routes/comments'));
app.use('/api', require('./routes/users'));
app.get('/', (req, res) => {
    return res.status(404).json({ error: 'Undefined ulr' });
});

const { PORT, NODE_ENV } = process.env;
app.listen(PORT, () =>
    console.log(`Server listening in ${NODE_ENV} mode on port ${PORT}`)
);
