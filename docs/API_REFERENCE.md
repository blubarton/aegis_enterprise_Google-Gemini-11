# 📖 Aegis Enterprise AI API Reference

Welcome to the API reference for Aegis Enterprise AI. This document covers the primary endpoints, WebSocket interfaces, and CLI commands available for integration and interaction.

---

## 🌐 REST API Endpoints

### POST `/predict`

- **Description**: Submit data for AI prediction and processing.
- **Request Body**: JSON object with input data.
- **Response**: JSON object with prediction results and cognitive metadata.
- **Errors**: Returns 403 if security validation fails, 500 for internal errors.

### GET `/healthcheck`

- **Description**: Check system health and status.
- **Response**: JSON with status and hyperintelligence flag.

---

## 🔌 WebSocket Interface

### `/converse/{user_id}`

- **Description**: Real-time conversational interface via WebSocket.
- **Protocol**: WebSocket
- **Messages**:
  - Client sends: Text query string.
  - Server responds: Text response string.
- **Usage**: Supports interactive AI sessions with cognitive context.

---

## 💻 CLI Interface

- **Start CLI**: Run the CLI interface for interactive sessions.
- **Commands**:
  - `exit`: Terminate the session.
  - Input any query to receive AI response.
- **Features**:
  - Displays quantum explanations when available.
  - Saves session transcripts to file.

---

## 📱 Mobile Bridge

- **Platform**: Android/iOS
- **Description**: Mobile app integration using Kivy or PyQt.
- **Features**:
  - Sends queries to AI backend.
  - Receives and displays responses.
  - Supports asynchronous communication.

---

## ⚙️ Configuration Files

- `config/mcp_config.json`: mCP connection and security settings.
- `config/sovereign_manifest.json`: Core system profiles and versions.
- `config/quantum_config.json`: Quantum simulator and algorithm parameters.

---

## 🔧 Dependencies

- Node.js packages: `axios`, `ws`, `puppeteer-core`, etc.
- Python packages: `torch`, `transformers`, `cryptography`, `msgpack`, etc.

---

## 🚀 Getting Started

1. Configure JSON files as per your environment.
2. Start backend services and Python AI modules.
3. Use REST API or WebSocket for integration.
4. Optionally use CLI or mobile bridge for interaction.

---

For detailed usage examples, see the `docs/USAGE.md` file.

---
