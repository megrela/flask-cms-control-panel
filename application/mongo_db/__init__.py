from application import app
from flask.ext.pymongo import PyMongo


mongo = PyMongo(app, "MONGO")
