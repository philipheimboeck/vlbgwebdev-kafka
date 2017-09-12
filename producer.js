const Kafka = require('node-rdkafka');

const producer = new Kafka.Producer(
    {
        'metadata.broker.list': '127.0.0.1:9092'
    }
);

// Connect to the broker
producer.connect();

// Wait for the ready event
producer.on('ready', () => {

    let counter = 0;

    function produce() {
        try {
            producer.produce(
                'topic',
                null, // random partition
                new Buffer("Hello VlbgWebDev " + (counter++)),
                null, // No key
                Date.now()
            );

            setTimeout(produce, 3000);

        } catch (error) {
            console.error('Error in producer');
            console.error(error);
        }
    };

    // Start producing
    produce();
});

producer.on('event.error', (error) => console.log(error));