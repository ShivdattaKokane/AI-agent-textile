# Enterprise AI Business Assistant

A production-ready Enterprise AI Business Assistant using React 19 and Python FastAPI, designed for SAP OData integration and future LLM integration.

## Project Structure

- `frontend/`: React 19, TypeScript, Vite, Material UI.
- `backend/`: Python 3.12, FastAPI, Clean Architecture.
- `docs/`: Architecture and API Documentation.

## Tech Stack

### Frontend
- **React 19**: Latest React features for modern UI.
- **TypeScript**: Strong typing for enterprise reliability.
- **Material UI**: Styled with SAP Fiori Horizon inspiration.
- **TanStack Query**: Efficient data fetching and caching.
- **React Hook Form & Zod**: Robust form handling and validation.
- **Recharts**: Professional data visualization.

### Backend
- **Python 3.12**: Modern Python features.
- **FastAPI**: High-performance API framework.
- **AI Orchestrator**: Intent-based routing to business agents.
- **JWT Authentication**: Secure enterprise-grade auth.
- **Logging**: Rotating file and console logs.

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+

### Running with Docker (Recommended)

```bash
docker-compose up --build
```

Access the application at `http://localhost:3000`.

### Manual Setup

#### Backend
```bash
cd backend
pip install -r requirements.txt
export PYTHONPATH=.
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## AI Architecture
The system uses an **Orchestrator Pattern**:
1. **Request** comes to FastAPI.
2. **AI Orchestrator** analyzes the user intent.
3. **Agent Layer** (Sales, Inventory, Production) fetches data from the **SAP Service**.
4. **Response** is formatted for the UI (Markdown, Tables, or Charts).

## Credentials
- **Email**: `admin@example.com`
- **Password**: `admin123`
