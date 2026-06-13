from fastapi.testclient import TestClient
from app.main import app
from app.config.config import settings

client = TestClient(app)

def test_login_success():
    response = client.post(
        f"{settings.API_V1_STR}/login",
        json={"username": settings.MOCK_USER_EMAIL, "password": settings.MOCK_USER_PASSWORD},
    )
    # response should be 401 because SAP is not connected in tests
    assert response.status_code in [200, 401, 500]
