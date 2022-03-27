const amqp = require('amqplib/callback_api');

const options = {
    clientProperties:
    {
        connection_name: 'producer-service'
    }
};

amqp.connect('amqp://admin:admin@localhost:5672', options, (error, connection) => {
    if (error) {
        throw err;
    }

    connection.createChannel((connErr, channel) => {
        if (connErr) {
            throw connErr;
        }

        channel.assertQueue('PhAuth', { durable: false });

        //channel.prefetch(1);

        channel.consume('PhAuth', (msg) => {
            console.log(msg.content.toString());

            setTimeout(() => {
                channel.ack(msg);
                connection.close();
                process.exit(0);
            }, 500);
        }, { noAck: true });
    });
});