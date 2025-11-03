import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import logger from './config/logger.js';
import './config/rabbitmq.js'; // initialize connection

dotenv.config();

const PORT = process.env.PORT || 5005;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});