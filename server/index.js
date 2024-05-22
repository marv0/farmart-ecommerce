const express = require('express');
const cors = require('cors');

const TokenRoute = require('./routes/token');

const app = express();

app.listen(5000, () => {
  console.log('server run nicely');
});

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Mpesa programming in progress, Time to get paid');
});

app.use('/api', TokenRoute);

module.exports = app;
