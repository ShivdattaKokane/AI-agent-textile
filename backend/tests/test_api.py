from fastapi.testclient import TestClient
from app.main import app
from app.config.config import settings

client = TestClient(app)

def test_login_success_admin():
    response = client.post(
        f"{settings.API_V1_STR}/login",
        json={"username": settings.MOCK_USER_EMAIL, "password": settings.MOCK_USER_PASSWORD},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_success_shivdatta():
    response = client.post(
        f"{settings.API_V1_STR}/login",
        json={"username": settings.MOCK_USER_2_USERNAME, "password": settings.MOCK_USER_2_PASSWORD},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_failure():
    response = client.post(
        f"{settings.API_V1_STR}/login",
        json={"username": "wronguser", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"
