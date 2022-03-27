const amqp = require('amqplib/callback_api');

const options = {
    clientProperties:
    {
        connection_name: 'producer-service'
    }
};

amqp.connect('amqp://admin:admin@localhost:5672', options, (error, connection) => {
    if (error) {
        throw error;
    }

    connection.createChannel((connErr, channel) => {
        if (connErr) {
            throw connErr;
        }

        channel.assertQueue('test_queue', {
            durable: true
        });

        channel.sendToQueue('test_queue', Buffer.from('Hola 2'), {
            persistent: true
        });
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});