# 📚 Usage Guide for Aegis Enterprise AI

Welcome to the usage guide! This document will help you interact with the Aegis Enterprise AI system effectively. 💬🤖

---

## 🖥️ Using the CLI Interface

1. Run the CLI interface:  
```bash
python -m interfaces.cli
```

2. Type your queries and receive AI responses interactively.  
3. Use `exit` to terminate the session.  
4. Sessions are saved automatically for review.

---

## 🌐 Using the REST API

- **Endpoint**: `POST /predict`  
- **Payload**: JSON with input data.  
- **Response**: JSON with prediction and metadata.

Example using `curl`:

```bash
curl -X POST http://localhost:8080/predict \
  -H "Content-Type: application/json" \
  -d '{"input": "Your query here"}'
```

---

## 🔌 Using the WebSocket Interface

- Connect to `/converse/{user_id}` for real-time chat.  
- Send text queries and receive responses asynchronously.

Example using JavaScript WebSocket:

```javascript
const ws = new WebSocket("ws://localhost:8000/converse/user123");
ws.onopen = () => ws.send("Hello AI!");
ws.onmessage = (msg) => console.log("AI:", msg.data);
```

---

## 📱 Mobile Bridge

- Use the `mobile_bridge.py` for Android/iOS integration.  
- Supports asynchronous query sending and response handling.

---

## ⚙️ Node System Interaction

- Nodes are registered and managed by the orchestrator.  
- You can extend the system by adding new nodes in the `node_system/nodes/` directory.  
- Supported nodes include platform, browser, AI enhancement, and language execution nodes.

---

## 🔒 Security & Quantum Features

- All communications are secured with quantum-resistant encryption.  
- Cognitive signatures replace traditional API keys for authentication.  
- Real-time threat detection protects the system from injection and adversarial attacks.

---

## 🚀 Getting Started

1. Ensure all services are running (backend, Python AI modules).  
2. Use CLI, API, or WebSocket to interact with the AI.  
3. Explore node capabilities and extend as needed.

---

Thank you for using Aegis Enterprise AI — where quantum intelligence meets sovereign cognition! 🌌🤖
