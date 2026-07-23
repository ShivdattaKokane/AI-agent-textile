from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Enterprise AI Business Assistant"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super-secret-key-for-development"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # Mock Users
    MOCK_USER_EMAIL: str = "admin@example.com"
    MOCK_USER_PASSWORD: str = "admin123"

    MOCK_USER_2_USERNAME: str = "shivdattakokane"
    MOCK_USER_2_PASSWORD: str = "Shiv@123"

    # SAP OData Configuration
    SAP_BASE_URL: str = "https://dashboard1.dnhspinners.com/zinq"
    SAP_CLIENT: str = "100"
    SAP_USERNAME: Optional[str] = None
    SAP_PASSWORD: Optional[str] = None
    SAP_API_KEY: Optional[str] = None # For SAP API Business Hub
    SAP_VERIFY_SSL: bool = True

    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"]

    class Config:
        case_sensitive = True

settings = Settings()
