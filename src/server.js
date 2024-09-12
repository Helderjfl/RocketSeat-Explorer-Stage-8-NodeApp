import express from 'express';
import { AppError } from './utils/AppError.js';
import "express-async-errors";
import { routes } from './routes/index.js';
import { migrationsRun } from './database/mysql/migrations/index.js';

migrationsRun();
const app = express();
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`
  });
})

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});