from app.services.odata_client import odata_client
from typing import List, Dict, Any

class SAPBusinessService:
    def __init__(self, service_path: str):
        self.service_path = service_path

class SalesService(SAPBusinessService):
    def __init__(self):
        super().__init__("API_SALES_ORDER_SRV")

    async def get_sales_summary(self) -> List[Dict[str, Any]]:
        # Example: Fetching top Sales Orders
        return await odata_client.get(self.service_path, "A_SalesOrder", params={"$top": 10})

class InventoryService(SAPBusinessService):
    def __init__(self):
        super().__init__("API_MATERIAL_STOCK_SRV")

    async def get_stock(self) -> List[Dict[str, Any]]:
        return await odata_client.get(self.service_path, "A_MatlStkInAcctMod", params={"$top": 10})

class ProductionService(SAPBusinessService):
    def __init__(self):
        super().__init__("API_PRODUCTION_ORDER_2_SRV")

    async def get_production_orders(self) -> List[Dict[str, Any]]:
        return await odata_client.get(self.service_path, "A_ProductionOrder", params={"$top": 10})

class ContractService(SAPBusinessService):
    def __init__(self):
        super().__init__("API_PURCHASECONTRACT_PROCESS_SRV")

    async def get_open_contracts(self) -> List[Dict[str, Any]]:
        return await odata_client.get(self.service_path, "A_PurchaseContract", params={"$top": 10})

class CustomerService(SAPBusinessService):
    def __init__(self):
        super().__init__("API_BUSINESS_PARTNER")

    async def get_customer_information(self, partner_id: str) -> Dict[str, Any]:
        return await odata_client.get(self.service_path, f"A_BusinessPartner('{partner_id}')")

# Instantiate services
sales_service = SalesService()
inventory_service = InventoryService()
production_service = ProductionService()
contract_service = ContractService()
customer_service = CustomerService()
