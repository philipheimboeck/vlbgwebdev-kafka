const Kafka = require('node-rdkafka');

const consumer = new Kafka.KafkaConsumer(
    {
        'group.id': 'kafka',    
        'metadata.broker.list': '127.0.0.1:9092'
    }
);

// Connect to the broker
consumer.connect();

consumer.on('ready', () => {
    consumer.subscribe(['topic']);
    consumer.consume();
}).on('data', (data) => {
    console.log(data.value.toString());
});
