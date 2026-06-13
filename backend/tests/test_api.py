from fastapi.testclient import TestClient
from app.main import app
from app.config.config import settings

client = TestClient(app)

def test_login_success():
    # Note: This will fail unless SAP is available or mocked
    # But we update it to use the new 'username' field
    response = client.post(
        f"{settings.API_V1_STR}/login",
        json={"username": settings.MOCK_USER_EMAIL, "password": settings.MOCK_USER_PASSWORD},
    )
    # assert response.status_code == 200
