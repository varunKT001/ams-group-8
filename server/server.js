// load env-vars
require('dotenv').config();

// requiring dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// initialize express
const app = express();

// requiring routers
const userRouter = require('./routes/userRouter');

// requiring middlewares
const errorMiddleware = require('./middleware/Error');

// require db configs
const connectToDb = require('./config/db');

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
connectToDb();

// cors
app.use(
  cors({
    origin: [/netlify\.app$/, /localhost:\d{4}$/],
    credentials: true,
  })
);

// using middlewares
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

// deployment setup
if (process.env.NODE_ENV === 'production') {
  const __directory = path.resolve();
  app.use(express.static(path.join(__directory, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__directory, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API service running 🚀');
  });
}

// using routers
app.use('/api/auth', userRouter);

// using other middlewares
app.use(errorMiddleware);

// starting server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
