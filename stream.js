const {KafkaStreams} = require("kafka-streams");

const config = {
    kafkaHost: "127.0.0.1:9092",
    groupId: "kafka-streams-test",
    clientName: "kafka-streams-test-name",
    workerPerPartition: 1
}
const factory = new KafkaStreams(config);

const stream = factory.getKStream("requests");
stream.forEach(e => {console.log(e)});
stream.map(message => {
        const value = JSON.parse(message.value);

        const isChrome = value.userAgent.indexOf("Chrome") !== -1;

        return isChrome;
    })
    .to('topic');

stream.start().then(() => {
    console.log("stream started, as kafka consumer is ready.");
}, error => {
    console.log("streamed failed to start: " + error);
});