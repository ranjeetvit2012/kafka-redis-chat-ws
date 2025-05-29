import { kafka } from "./kafka.config";
import {RedisClient} from "./redis.config.js"

const consumer = kafka.consumer({ groupId: 'test-group' })

export const consumeMessages =async ()=>{
    
await consumer.connect()
await consumer.subscribe({ topic: "chat-kf-message", fromBeginning: true })

await consumer.run({
  autoCommit:true,
  eachMessage: async ({ topic, partition, message }:any) => {
   //const data = message.value.toString();
    const parsed = JSON.parse(message.value.toString());
      console.log(`📩 Message from topic ${topic}:`, parsed);
   console.log("consumer",parsed)
     console.log({
        topic,
        partition,
        offset: message.offset,
      });
     try {
      
      //  await RedisClient.lPush("problems",message?.value); send data qube
        await RedisClient.publish("problems",message.value.toString());
       // await RedisClient.quit();
        // Store in the database
      //  res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
       // res.status(500).send("Failed to store submission.");
    }
    console.log({
      value: message.value.toString(),
    })
  },
})
// await consumer.run({
//     eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning }) => {
//       for (const message of batch.messages) {
//         if (!isRunning()) break;

//         try {
//           const data =message?.value? JSON.parse(message.value.toString()):"";
//           await RedisClient.lPush('problems', JSON.stringify(data)); // Store as string

//           console.log('Saved to Redis:', data);
//           resolveOffset(message.offset); // Mark message as processed
//           await heartbeat(); // Keep session alive
//         } catch (error) {
//           console.error('Redis error:', error);
//         }
//       }
//     },
//   });
};


// await consumer.run({
//   eachMessage: async ({ topic, partition, message }:any) => {
//    const data = JSON.parse(message.value.toString());
//      try {
//         await Redisclient.lPush("problems",data);
//         // Store in the database
//       //  res.status(200).send("Submission received and stored.");
//     } catch (error) {
//         console.error("Redis error:", error);
//        // res.status(500).send("Failed to store submission.");
//     }
//     console.log({
//       value: message.value.toString(),
//     })
//   },
// })




