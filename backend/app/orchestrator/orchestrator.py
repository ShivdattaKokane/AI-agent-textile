from typing import Dict, Any
from app.agents.business_agents import SalesAgent, InventoryAgent, GeneralAgent
from app.prompts.templates import SYSTEM_ORCHESTRATOR_PROMPT

class AIOrchestrator:
    def __init__(self):
        self.agents = {
            "sales": SalesAgent(),
            "inventory": InventoryAgent(),
            "general": GeneralAgent()
        }

    async def route_request(self, query: str) -> Dict[str, Any]:
        """
        Routes the request based on intent.
        In production, this would use an LLM for classification.
        """
        q = query.lower()
        if any(w in q for w in ["sales", "revenue", "trend"]):
            agent_key = "sales"
        elif any(w in q for w in ["inventory", "stock", "warehouse"]):
            agent_key = "inventory"
        else:
            agent_key = "general"

        agent = self.agents[agent_key]
        return await agent.process(query)

orchestrator = AIOrchestrator()
