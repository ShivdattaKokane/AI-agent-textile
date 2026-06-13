from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.schemas.schemas import LoginRequest, Token, User
from app.config.config import settings
from app.utils.security import create_access_token
from app.services.auth_service import auth_service
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username:
            return User(id=username, username=username, full_name=username, role="User")
    except JWTError:
        pass
    raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    try:
        sap_response = await auth_service.login(login_data.username, login_data.password)

        if sap_response.success:
            return {
                "access_token": create_access_token(subject=login_data.username),
                "token_type": "bearer"
            }
        else:
            error_message = sap_response.payload.message
            if sap_response.payload.errors:
                error_message += ": " + ", ".join(sap_response.payload.errors)

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=error_message
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login endpoint error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during authentication"
        )

@router.get("/me", response_model=User)
async def me(user: User = Depends(get_current_user)):
    return user
