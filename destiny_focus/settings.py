# -*- coding: utf-8 -*-
"""Application configuration.

Most configuration is set via environment variables.

For local development, use a .env file to set
environment variables.
"""
from environs import Env
import os
# from urllib.parse import urlparse # pylint disable=unused-import
# import redis

basedir = os.path.abspath(os.path.dirname(__file__))

env = Env()
env.read_env()

ENV = env.str("FLASK_ENV", default="production")
DEBUG = ENV == "development"
#SQLALCHEMY_DATABASE_URI = env.str("DATABASE_URL")
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    'sqlite:///' + os.path.join(basedir, '../dev.db')

REDIS_DATABASE_URI = os.environ.get('REDIS_URL') or \
    'redis://127.0.0.1:6379/0'
# redis_url = urlparse(REDIS_DATABASE_URI)
# redis_db = redis.StrictRedis(host=redis_url.hostname, port=redis_url.port, db=0, password=redis_url.password, charset="utf-8", decode_responses=True)

SECRET_KEY = env.str("SECRET_KEY")
SEND_FILE_MAX_AGE_DEFAULT = env.int("SEND_FILE_MAX_AGE_DEFAULT")
BCRYPT_LOG_ROUNDS = env.int("BCRYPT_LOG_ROUNDS", default=13)
DEBUG_TB_ENABLED = DEBUG
DEBUG_TB_INTERCEPT_REDIRECTS = False
CACHE_TYPE = "simple"  # Can be "memcached", "redis", etc.
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Bungie Auth credentials need to be set in .env file:
OAUTH_CREDENTIALS = {
    'bungie': {
        'api_key': os.environ.get('BUNGIE_API_KEY'),
        'id': os.environ.get('BUNGIE_CLIENT_ID'),
        'secret': os.environ.get('BUNGIE_CLIENT_SECRET')

    }
}
