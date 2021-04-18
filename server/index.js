const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const scoreRouter = require('./routes/score');
const uploadRouter = require('./routes/upload');
const usersRouter = require('./routes/users');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/users', usersRouter);
app.use('/score', scoreRouter);
app.use('/upload', uploadRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});