import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, async () => {
  const a = await Promise.resolve(20);
  console.log(`(TESTING) Server listening on PORT: 3000. ${a}`);
});
