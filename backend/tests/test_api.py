from fastapi.testclient import TestClient
from app.main import app
from app.config.config import settings

client = TestClient(app)

def test_login_success():
    response = client.post(
        f"{settings.API_V1_STR}/login",
        json={"email": settings.MOCK_USER_EMAIL, "password": settings.MOCK_USER_PASSWORD},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
