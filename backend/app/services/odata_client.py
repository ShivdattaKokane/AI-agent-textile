import httpx
import logging
import asyncio
from typing import Any, Dict, Optional
from app.config.config import settings

logger = logging.getLogger(__name__)

class ODataClient:
    def __init__(self):
        self.base_url = settings.SAP_BASE_URL.rstrip('/')
        self.sap_client = settings.SAP_CLIENT
        self.auth = None
        if settings.SAP_USERNAME and settings.SAP_PASSWORD:
            self.auth = (settings.SAP_USERNAME, settings.SAP_PASSWORD)

        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        if settings.SAP_API_KEY:
            self.headers["APIKey"] = settings.SAP_API_KEY

        if not settings.SAP_VERIFY_SSL:
            logger.warning("SSL verification is disabled for SAP ODataClient. This is only recommended for development.")

    async def _call_with_retry(self, method: str, url: str, **kwargs) -> httpx.Response:
        max_retries = 3
        backoff_factor = 2

        verify = settings.SAP_VERIFY_SSL

        async with httpx.AsyncClient(auth=self.auth, headers=self.headers, timeout=30.0, verify=verify) as client:
            for attempt in range(max_retries + 1):
                try:
                    logger.info(f"SAP API Call: {method} {url} (Attempt {attempt + 1})")
                    response = await client.request(method, url, **kwargs)
                    response.raise_for_status()
                    return response
                except httpx.HTTPStatusError as e:
                    logger.error(f"SAP API HTTP Error: {e.response.status_code} - {e.response.text}")
                    if attempt == max_retries:
                        raise
                except (httpx.ConnectError, httpx.TimeoutException) as e:
                    logger.error(f"SAP API Connection Error: {str(e)}")
                    if attempt == max_retries:
                        raise

                wait_time = backoff_factor ** attempt
                logger.info(f"Retrying in {wait_time} seconds...")
                await asyncio.sleep(wait_time)

        raise Exception("Failed to call SAP API after retries")

    async def get(self, service_path: str, entity_set: str, params: Optional[Dict[str, Any]] = None) -> Any:
        url = f"{self.base_url}/{service_path}/{entity_set}"
        response = await self._call_with_retry("GET", url, params=params)
        data = response.json()
        # OData v2 and v4 have different response structures
        return data.get("d", {}).get("results") if "d" in data else data.get("value", data)

    async def call_api(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Any:
        """Generic API call for non-standard OData endpoints like the login one."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        response = await self._call_with_retry("GET", url, params=params)
        return response.json()

odata_client = ODataClient()
