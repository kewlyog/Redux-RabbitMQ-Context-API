import amqp from 'amqplib';
import logger from '../config/logger.js';

const processTask = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('task_queue');
    logger.info('Worker waiting for tasks...');

    channel.consume("task_queue", (msg) => {
        const task = JSON.parse(msg.content.toString());
        logger.info(`Processing task: ${task.title}`);
        setTimeout(() => {
            logger.info(`Task completed: ${task.title}`);
            channel.ack(msg);
        }, 2000);
    })
}

processTask();