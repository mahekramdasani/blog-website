from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
import jwt
from datetime import datetime, timedelta

SECRET_KEY = 'blog@#5%$#^'

def generate_jwt_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token
