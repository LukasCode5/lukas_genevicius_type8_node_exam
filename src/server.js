const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = require('./config');
const usersRoutes = require('./routes/usersRoutes');
// eslint-disable-next-line no-unused-vars
const { showBody } = require('./middleWare');

const app = express();

// middleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// app.use(showBody);

// Routes
app.use('/api', usersRoutes);

// 404 route
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Server online on port', PORT));
