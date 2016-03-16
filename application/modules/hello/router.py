from . import module

from flask import render_template
from application.mongo_db import mongo


@module.route('/', methods=("GET", "POST"))
def index():
    for user in mongo.db.user.find():
        print(user)
    return render_template("hello/hello.html")


@module.route('/s/<name>', methods=("GET", "POST"))
def hello_to(name):
    mongo.db.user.insert({"name": name})
    return render_template("hello/to.html", name=name)

