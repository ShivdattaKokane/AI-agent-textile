from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from app.services.sap_business_services import sales_service, inventory_service, production_service

class BaseAgent:
    def __init__(self, name: str):
        self.name = name
    async def process(self, query: str) -> Dict[str, Any]:
        raise NotImplementedError

class SalesAgent(BaseAgent):
    def __init__(self): super().__init__("Sales Agent")
    async def process(self, query: str) -> Dict[str, Any]:
        try:
            data = await sales_service.get_sales_summary()
            return {
                "id": str(uuid.uuid4()), "role": "assistant",
                "content": "### SAP Sales Orders\nI've retrieved the latest sales orders from SAP S/4HANA.",
                "content_type": "table", "data": data, "timestamp": datetime.now()
            }
        except Exception as e:
            return self._error_response(str(e))

    def _error_response(self, error: str):
        return {"id": str(uuid.uuid4()), "role": "assistant", "content": f"Error fetching SAP data: {error}", "content_type": "text", "timestamp": datetime.now()}

class InventoryAgent(BaseAgent):
    def __init__(self): super().__init__("Inventory Agent")
    async def process(self, query: str) -> Dict[str, Any]:
        try:
            data = await inventory_service.get_stock()
            return {
                "id": str(uuid.uuid4()), "role": "assistant",
                "content": "### SAP Inventory Stock\nHere is the current material stock level from SAP.",
                "content_type": "table", "data": data, "timestamp": datetime.now()
            }
        except Exception as e:
            return {"id": str(uuid.uuid4()), "role": "assistant", "content": f"Error: {str(e)}", "content_type": "text", "timestamp": datetime.now()}

class ProductionAgent(BaseAgent):
    def __init__(self): super().__init__("Production Agent")
    async def process(self, query: str) -> Dict[str, Any]:
        try:
            data = await production_service.get_production_orders()
            return {
                "id": str(uuid.uuid4()), "role": "assistant",
                "content": "### SAP Production Orders\nI've retrieved the current production orders.",
                "content_type": "table", "data": data, "timestamp": datetime.now()
            }
        except Exception as e:
            return {"id": str(uuid.uuid4()), "role": "assistant", "content": f"Error: {str(e)}", "content_type": "text", "timestamp": datetime.now()}

class GeneralAgent(BaseAgent):
    def __init__(self): super().__init__("General Agent")
    async def process(self, query: str) -> Dict[str, Any]:
        return {
            "id": str(uuid.uuid4()), "role": "assistant",
            "content": f"I am connected to SAP S/4HANA. I can help with Sales, Inventory, and Production data. You asked: *{query}*",
            "content_type": "text", "timestamp": datetime.now()
        }
