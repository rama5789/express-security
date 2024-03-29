const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const morgan = require('morgan');
const winston = require('winston');

const app = express();

/* const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
} */

// app.use(cors(corsOptions));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
// app.use(morgan('dev')); // 'tiny' , 'combined'

app.get('/', (req, res) => {
  /* res.cookie('session', '1', { httpOnly: true });
  res.cookie('session', '1', { secure: true }); */
  /* res.set({
    'Content-Security-Policy': "script-src 'self' 'https://apis.google.com'"
  }); */
  res.send('Hello World!');
});

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission');
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));