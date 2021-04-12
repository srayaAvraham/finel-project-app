const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const scoreRouter = require('./routes/score');
const uploadRouter = require('./routes/upload');
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/score', scoreRouter);
app.use('/upload', uploadRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});