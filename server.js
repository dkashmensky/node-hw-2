const express = require('express');
const app = express();

const loginRouter = require('./routes/api/login');
const noteRouter = require('./routes/api/notes');
const registerRouter = require('./routes/api/register');
const deleteRouter = require('./routes/api/delete-user');
const auth = require('./routes/middleware/auth');

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Content-Type')
  next();
});

app.use('/api', loginRouter);
app.use('/api', registerRouter);

app.use(auth);

app.use('/api', noteRouter);
app.use('/api', deleteRouter);

app.listen(8080);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTU4NDcwMzE2Nn0.-z7dOB8tRKqTT8G93OaG3AFdQORGx4nkSKXVmNGCxa0