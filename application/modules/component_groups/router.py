from flask import render_template, request, session, redirect, url_for
from application.mongo_db import mongo

from . import module
from .setup import setup

import json


@module.route('/', methods=("GET", "POST"))
def index():
    kwargs = {"dependencies": setup()}
    return render_template("component_groups/component_groups.html", **kwargs)


@module.route('/add', methods=("POST",))
def add():
    res = mongo.db.component_groups.insert_one({
        "name": request.form.get("name"),
        "group_id": request.form.get("group_id")
    })
    return json.dumps({"id": str(res.inserted_id)})
