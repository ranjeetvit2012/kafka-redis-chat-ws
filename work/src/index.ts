import { createClient } from "redis";
const client = createClient();

async function startWorker() {

    try {
        await client.connect();
        console.log("connect")

            await client.subscribe('problems', (message) => {
            console.log(`Received: ${message}`);
            });

    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();