from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from datetime import datetime
import uuid
from app.schemas.schemas import ChatRequest, ChatResponse, DashboardData, User, DashboardKPI
from app.api.auth import get_current_user
from app.orchestrator.orchestrator import orchestrator
from app.services.sap_service import sap_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, user: User = Depends(get_current_user)):
    resp = await orchestrator.route_request(request.message)
    resp["conversation_id"] = request.conversation_id or str(uuid.uuid4())
    return resp

@router.get("/dashboard", response_model=DashboardData)
async def dashboard(user: User = Depends(get_current_user)):
    k = await sap_service.get_kpis()
    return DashboardData(
        kpis=[DashboardKPI(title="Sales", value=k["total_sales"], change=5.0, trend="up")],
        recent_activity=[{"id": 1, "action": "Login", "time": "now"}],
        alerts=[{"id": "1", "severity": "high", "message": "Test Alert", "category": "General"}]
    )

@router.get("/reports")
async def reports(user: User = Depends(get_current_user)):
    return [{"id": "R1", "title": "Sales Report", "category": "Sales", "date": "2024-10-01"}]
