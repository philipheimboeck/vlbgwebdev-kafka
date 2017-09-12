const express = require('express');
const app = express();

const Kafka = require('node-rdkafka');

const producer = new Kafka.Producer(
    {
        'metadata.broker.list': '127.0.0.1:9092'
    }
);

// Connect to the broker
producer.connect();


/**
 * Send a new message to the producer
 * @param {*string} data 
 */
function produce(data) {
    try {
        producer.produce(
            'requests',
            null, // random partition
            new Buffer(data),
            null, // No key
            Date.now()
        );
    
    } catch (error) {
        console.error('Error in producer');
        console.error(error);
    }
}

/**
 * GET Function that returns the client data
 */
app.get('/', (req, res) => {
    const ua = req.get('User-Agent');
    const ref = req.get('Referer');

    console.log(req.headers);

    const clientData = {
        userAgent: ua,
        referer: ref
    };

    const message = JSON.stringify(clientData);

    produce(message);

    res.setHeader('Content-Type', 'application/json');
    res.send(message);
});

// Start server
app.listen(8080);