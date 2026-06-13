from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any, Dict
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    id: str
    role: str
    content: str
    content_type: str = "text"
    data: Optional[Any] = None
    timestamp: datetime
    conversation_id: str

class DashboardKPI(BaseModel):
    title: str
    value: str
    change: float
    trend: str

class DashboardData(BaseModel):
    kpis: List[DashboardKPI]
    recent_activity: List[Dict[str, Any]]
    alerts: List[Dict[str, Any]]

class SAPLoginPayload(BaseModel):
    message: str
    errors: List[str]

class SAPLoginResponse(BaseModel):
    success: bool
    username: str
    payload: SAPLoginPayload
    timestamp: datetime
