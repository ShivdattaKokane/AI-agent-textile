from app.services.odata_client import odata_client
from app.schemas.schemas import SAPLoginResponse
from app.config.config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class AuthenticationService:
    async def login(self, username: str, password: str) -> SAPLoginResponse:
        params = {
            "sap-client": settings.SAP_CLIENT,
            "Username": username,
            "Password": password
        }

        try:
            # Endpoint: /getlogin (base URL is https://dashboard1.dnhspinners.com/zinq)
            response_data = await odata_client.call_api("getlogin", params=params)
            return SAPLoginResponse(**response_data)
        except Exception as e:
            logger.error(f"SAP Login Error: {str(e)}")
            # In case of direct failure or unexpected format, raise for the API to handle
            raise

auth_service = AuthenticationService()
