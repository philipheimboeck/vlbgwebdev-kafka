# VlbgWebDev Kafka

This repository contains some examples for Apache Kafka using node.js implementations.

## Requirements

* Apache Kafka >= 0.9
* https://github.com/edenhill/librdkafka

## Install

Install with `yarn install`

## Examples

To run the following examples, you need Apache Kafka installed or run the
provided `spotify/kafka` docker instance with `docker-compose up`.

### Producer

`producer.js` periodically writes a message to the topic `topic`.

Start with `node producer.js`.

### Consumer

`consumer.js` consumes messages written to the topic `topic` and simply prints them out.

Start with `node consumer.js`.

### Web

`web.js` starts an express web service that returns the user agent and referer to the client.
It also writes those messages to the topic `requests`.

Start with `node web.js` and visit `localhost:8080`.

### Stream

`stream.js` uses [kafka-streams](https://github.com/nodefluent/kafka-streams) and subscribes to the `requests` topic. It checks if the user agent contains the string `Chrome`. If so it returns true, otherwise it returns false.

The results are written to the topic `topic` where the consumer can print it.

Start with `node stream.js`.