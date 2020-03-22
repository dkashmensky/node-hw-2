const express = require('express');
const app = express();
const cors = require('cors');

// Router
const loginRouter = require('./routes/api/login');
const noteRouter = require('./routes/api/notes');
const registerRouter = require('./routes/api/register');
const deleteRouter = require('./routes/api/delete-user');
const infoRouter = require('./routes/api/user-info');

// Middleware
const auth = require('./routes/middleware/auth');
const headers = require('./routes/middleware/headers');

app.options('*', cors());
app.use(express.json());

app.use(headers);

app.use('/api', loginRouter);
app.use('/api', registerRouter);

app.use(auth);

app.use('/api', noteRouter);
app.use('/api', deleteRouter);
app.use('/api', infoRouter);

app.listen(8080);
