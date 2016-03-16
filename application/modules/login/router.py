from . import module

from flask import render_template
from application.mongo_db import mongo


@module.route('/', methods=("GET", "POST"))
def index():
    return render_template("login/login.html")
