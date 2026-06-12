from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from app.services.sap_service import sap_service

class BusinessAgent:
    async def process(self, query: str) -> Dict[str, Any]:
        if "sales" in query.lower():
            data = await sap_service.get_sales_data()
            return {"id": str(uuid.uuid4()), "role": "assistant", "content": "Sales data:", "content_type": "chart", "data": data, "timestamp": datetime.now()}
        elif "inventory" in query.lower():
            data = await sap_service.get_inventory_stock()
            return {"id": str(uuid.uuid4()), "role": "assistant", "content": "Stock levels:", "content_type": "table", "data": data, "timestamp": datetime.now()}
        return {"id": str(uuid.uuid4()), "role": "assistant", "content": f"You asked about {query}", "content_type": "text", "timestamp": datetime.now()}

class AIOrchestrator:
    def __init__(self):
        self.agent = BusinessAgent()
    async def route_request(self, query: str) -> Dict[str, Any]:
        return await self.agent.process(query)

orchestrator = AIOrchestrator()
