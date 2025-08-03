# ⚙️ Installation & Setup Guide for Aegis Enterprise AI

Welcome! This guide will help you get Aegis Enterprise AI up and running smoothly. 🚀

---

## 🛠️ Prerequisites

- **Node.js** (v14 or higher)  
- **npm** (Node package manager)  
- **Python 3.8+**  
- **pip** (Python package manager)  
- **Git** (for cloning repository)  

---

## 📥 Clone the Repository

```bash
git clone https://github.com/yourusername/aegis-enterprise-ai.git
cd aegis-enterprise-ai
```

---

## 💻 Install Dependencies

### Node.js (TypeScript parts)

```bash
npm install axios ws puppeteer-core @types/puppeteer-core
```

### Python (AI modules)

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 🔧 Configuration

- Edit JSON config files in the `config/` directory to suit your environment:  
  - `mcp_config.json`  
  - `sovereign_manifest.json`  
  - `quantum_config.json`  

- Set environment variables for API keys and quantum keys as needed.

---

## 🚀 Running the System

### Start Backend Services

```bash
npm run start
```

### Run Python AI Modules

```bash
python sovereign_start.py
```

---

## 📱 Mobile Integration

- Use the `mobile_bridge.py` for Android/iOS integration with Kivy or PyQt.

---

## 🧪 Testing

- Run unit and integration tests to verify installation:  
```bash
pytest tests/
```

---

## 💬 Support

For issues or questions, please open an issue on GitHub or contact the maintainers.

---

Thank you for choosing Aegis Enterprise AI! 🌌🤖
