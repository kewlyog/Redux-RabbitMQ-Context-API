import amqp from 'amqplib';
import logger from '../config/logger.js';

let tasks = [];

export const getTasks = (req, res) => {
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: Date.now(), title, description, status: 'Pending' };
    tasks.push(newTask);

    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue("task_queue");
        channel.sendToQueue("task_queue", Buffer.from(JSON.stringify(newTask)));
        logger.info(`Task Queued: ${title}`);
        res.status(201).json(newTask);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Failed to publish task" });
    }
}