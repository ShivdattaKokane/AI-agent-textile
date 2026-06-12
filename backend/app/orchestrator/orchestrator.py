from typing import Dict, Any
from app.agents.business_agents import SalesAgent, InventoryAgent, ProductionAgent, GeneralAgent

class AIOrchestrator:
    def __init__(self):
        self.agents = {
            "sales": SalesAgent(),
            "inventory": InventoryAgent(),
            "production": ProductionAgent(),
            "general": GeneralAgent()
        }

    async def route_request(self, query: str) -> Dict[str, Any]:
        q = query.lower()
        if any(w in q for w in ["sales", "revenue", "order"]):
            agent_key = "sales"
        elif any(w in q for w in ["inventory", "stock", "warehouse", "material"]):
            agent_key = "inventory"
        elif any(w in q for w in ["production", "manufactur"]):
            agent_key = "production"
        else:
            agent_key = "general"

        agent = self.agents[agent_key]
        return await agent.process(query)

orchestrator = AIOrchestrator()
