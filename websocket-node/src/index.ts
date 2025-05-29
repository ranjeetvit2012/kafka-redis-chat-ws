import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import {produceMessage,connectKafkaProducer} from "./config/kafka.producer"
import {consumeMessages} from "./config/kafka.consumer"
import {RedisClient} from "./config/redis.config"
import dotenv from 'dotenv';
import { json } from 'stream/consumers';
import { timeStamp } from 'console';
dotenv.config();


const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});
consumeMessages()
const wss = new WebSocketServer({ server });
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
   let messageInfo = {
  userId: 1,
  message: data.toString(),
  timestamp: new Date().toISOString()
};

const value = JSON.stringify(messageInfo);
    // data.toString(); // Convert Buffer to string

    // Send Kafka message with valid format
    produceMessage("chat-kf-message", [{ value }]);

    // Broadcast to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data); // Re-broadcast raw buffer or string
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});


// * Add Kafka Producer
connectKafkaProducer().catch((err) => console.log("Kafka Consumer error", err));

consumeMessages().catch((err) =>
  console.log("The Kafka Consume error", err)
);

RedisClient.on('error', (err) => console.log('Redis client Error', err));



async function startServer() {
    try {
        await RedisClient.connect();
        console.log("Connected to Redis");

        server.listen(8080, () => {
            console.log("Server is running on port 8080");
        });
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();