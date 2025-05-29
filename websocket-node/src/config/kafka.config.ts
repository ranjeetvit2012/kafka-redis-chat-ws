import { Kafka, logLevel } from "kafkajs";
import fs from "fs"
import path from "path";

//console.log("process.env.KAFKA_BROKER",process.env.KAFKA_BROKER)

export const kafka = new Kafka({
  brokers: ["KAFKA_BROKER:22877"],
  ssl: {
    ca:[fs.readFileSync(path.resolve("./ca.pem",),"utf-8")]
  },
  sasl: {
    mechanism: "plain",
    username: "KAFKA_USERNAME",
    password: "KAFKA_PASSWORD",
  },
  logLevel: logLevel.ERROR,
});


