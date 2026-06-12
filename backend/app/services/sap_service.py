from typing import List, Dict, Any

class SAPService:
    async def get_sales_data(self) -> List[Dict[str, Any]]:
        return [{"Month": "Jan", "Sales": 45000, "Target": 40000}, {"Month": "Feb", "Sales": 52000, "Target": 40000}]
    async def get_inventory_stock(self) -> List[Dict[str, Any]]:
        return [{"Material": "Steel Sheet", "Stock": 1200, "Unit": "KG"}]
    async def get_production_orders(self) -> List[Dict[str, Any]]:
        return [{"OrderID": "10001", "Material": "Motor AC", "Status": "Released"}]
    async def get_kpis(self) -> Dict[str, Any]:
        return {"total_sales": "€1.2M", "production_efficiency": "94%", "inventory_value": "€450K", "pending_orders": "12"}

sap_service = SAPService()
