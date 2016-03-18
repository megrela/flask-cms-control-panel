import os

_basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = False
ADMINS = frozenset(["g.megreli@gmail.com"])
SECRET_KEY = "123"

HOST = "127.0.0.1"
PORT = 5000

MONGO_DBNAME = "cms"
MONGO_HOST = "localhost"
MONGO_PORT = 27017
