import express from 'express';

import GLOBAL from '../lib/GLOBAL';

const app = express();

app.get('/ping', (req, res) => {
  res.send('Hello World');
});

app.listen(GLOBAL.SERVER_PORT, () => {
  console.log(`Server listening on PORT: ${GLOBAL.SERVER_PORT}.`);
});
