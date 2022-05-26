const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = require('./config');

const app = express();

// middleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// 404 route
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Server online on port', PORT));
