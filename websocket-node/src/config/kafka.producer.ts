import { kafka } from "./kafka.config"

const producer = kafka.producer()


export const produceMessage = async(topic: string, message: any)=>{
  console.log("topic",topic,message)
await producer.connect()
await producer.send({
  topic: topic,
  messages: message
})

await producer.disconnect()
}

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected...");
};


