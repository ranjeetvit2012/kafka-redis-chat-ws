# ⚡️ Real-Time Scalable Chat Application

This is a production-ready, real-time **chat application** architected for **scalability**, **performance**, and **reliability** using modern backend technologies and distributed message streaming.

---

## 🏗️ Tech Stack

- **Frontend**: React.js + TypeScript
- **Backend**: Node.js + TypeScript
- **Real-Time Messaging**: WebSocket
- **Message Streaming**: Apache Kafka
- **Message Broker**: Redis (Pub/Sub)
- **Communication Flow**: Kafka → Redis → WebSocket
- **Architecture**: Event-driven, loosely coupled microservice-ready design

---

## 🚀 Features

- ✅ Real-time chat between multiple clients
- ✅ Scalable architecture using Kafka for message buffering
- ✅ Redis Pub/Sub to decouple services and push messages to WebSocket layer
- ✅ WebSocket server for instant communication with clients
- ✅ React frontend for fast, interactive UI
- ✅ Written entirely in TypeScript for type safety
- ✅ Extensible and production-ready message pipeline
- ✅ Works well with horizontal scaling (multiple instances of consumers/producers)

---

## 🔄 Architecture Diagram

```text
[React Frontend]
       |
       ▼
[WebSocket Server] ◀─────────────▶ [Redis Subscriber]
       ▲                               ▲
       |                               |
[Client Message]                  [Kafka Consumer]
       ▲                               ▲
       |                               |
[Kafka Producer] ──────▶ [Kafka Broker]
