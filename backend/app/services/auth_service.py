from app.config.config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class AuthenticationService:
    async def login(self, username: str, password: str) -> bool:
        """
        Validate login credentials against mock data to avoid SAP connectivity issues.
        """
        # Lowercase username for case-insensitive check if desired, or exact match.
        # Let's support exact matching or simple case insensitivity for standard username
        user_lower = username.lower().strip()

        # Check against shivdattakokane
        if user_lower == settings.MOCK_USER_2_USERNAME.lower() and password == settings.MOCK_USER_2_PASSWORD:
            return True

        # Check against admin@example.com
        if user_lower == settings.MOCK_USER_EMAIL.lower() and password == settings.MOCK_USER_PASSWORD:
            return True

        return False

auth_service = AuthenticationService()
