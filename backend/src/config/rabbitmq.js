import amqp from 'amqplib';
import logger from './logger.js';

export const initRabbit = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue('task_queue');
        logger.info("RabbitMQ connected and queue initialized");
    } catch (err) {
        logger.error("RabbitMQ connection failed: " + err.message);
    }
}

initRabbit();