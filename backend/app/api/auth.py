from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.schemas.schemas import LoginRequest, Token, User
from app.config.config import settings
from app.utils.security import create_access_token
from datetime import timedelta

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email == settings.MOCK_USER_EMAIL:
            return User(id="1", email=email, full_name="Admin", role="Admin")
    except JWTError:
        pass
    raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    if login_data.email == settings.MOCK_USER_EMAIL and login_data.password == settings.MOCK_USER_PASSWORD:
        return {"access_token": create_access_token(subject=login_data.email), "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/me", response_model=User)
async def me(user: User = Depends(get_current_user)):
    return user
