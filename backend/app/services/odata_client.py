import httpx
import logging
from typing import Any, Dict, Optional
from app.config.config import settings

logger = logging.getLogger(__name__)

class ODataClient:
    def __init__(self):
        self.base_url = settings.SAP_BASE_URL
        self.auth = None
        if settings.SAP_USERNAME and settings.SAP_PASSWORD:
            self.auth = (settings.SAP_USERNAME, settings.SAP_PASSWORD)

        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        if settings.SAP_API_KEY:
            self.headers["APIKey"] = settings.SAP_API_KEY

    async def get(self, service_path: str, entity_set: str, params: Optional[Dict[str, Any]] = None) -> Any:
        url = f"{self.base_url}/{service_path}/{entity_set}"

        async with httpx.AsyncClient(auth=self.auth, headers=self.headers, timeout=30.0) as client:
            try:
                logger.info(f"Calling SAP OData: GET {url}")
                response = await client.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                # OData v2 and v4 have different response structures
                return data.get("d", {}).get("results") if "d" in data else data.get("value", data)
            except httpx.HTTPStatusError as e:
                logger.error(f"SAP OData HTTP Error: {e.response.status_code} - {e.response.text}")
                raise
            except Exception as e:
                logger.error(f"SAP OData Connection Error: {str(e)}")
                raise

odata_client = ODataClient()
